#!/bin/bash

set -euo pipefail

if [[ "${SKIP_SECRETS_SCAN:-}" == "true" ]]; then
  echo "Skipping secrets scan"
  exit 0
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository; skipping secrets scan"
  exit 0
fi

MODE="${SCAN_MODE:-warn}"
SCOPE="${SCAN_SCOPE:-diff}"

PATTERNS=(
  "PRIVATE_KEY|critical|-----BEGIN (RSA |EC |OPENSSH |DSA |PGP )?PRIVATE KEY-----"
  "GITHUB_TOKEN|critical|gh[pousr]_[A-Za-z0-9]{36,}"
  "GITHUB_FINE_GRAINED_PAT|critical|github_pat_[A-Za-z0-9_]{40,}"
  "CLERK_SECRET|critical|sk_(live|test)_[A-Za-z0-9]{20,}"
  "STRIPE_SECRET|critical|sk_live_[A-Za-z0-9]{20,}"
  "DB_URL|high|(postgres|postgresql|mysql|redis|mongodb(\\+srv)?)://[^[:space:]'\"]{10,}"
  "GENERIC_SECRET|high|(secret|token|password|passwd|api[_-]?key|client[_-]?secret)[[:space:]]*[:=][[:space:]]*['\"]?[A-Za-z0-9_/+=~.-]{8,}"
  "JWT|medium|eyJ[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}\\.[A-Za-z0-9_-]{8,}"
)

collect_files() {
  if [[ "$SCOPE" == "staged" ]]; then
    git diff --cached --name-only --diff-filter=ACMR
  else
    git diff --name-only --diff-filter=ACMR HEAD 2>/dev/null || git diff --name-only --diff-filter=ACMR
    git ls-files --others --exclude-standard
  fi
}

is_text_file() {
  case "$1" in
    *.md|*.txt|*.json|*.yaml|*.yml|*.toml|*.env|*.env.*|*.sh|*.sql|*.ts|*.tsx|*.js|*.jsx|*.css|*.scss|*.html)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}

is_allowlisted() {
  local match="$1"
  IFS=',' read -r -a allowlist <<< "${SECRETS_ALLOWLIST:-}"
  for pattern in "${allowlist[@]}"; do
    pattern="$(printf '%s' "$pattern" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    [[ -z "$pattern" ]] && continue
    if [[ "$match" == *"$pattern"* ]]; then
      return 0
    fi
  done
  return 1
}

FILES=()
while IFS= read -r file; do
  [[ -n "$file" ]] && FILES+=("$file")
done < <(collect_files | sort -u)

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No modified files to scan"
  exit 0
fi

findings=0

for file in "${FILES[@]}"; do
  [[ -f "$file" ]] || continue
  is_text_file "$file" || continue

  for entry in "${PATTERNS[@]}"; do
    IFS='|' read -r name severity regex <<< "$entry"
    while IFS=: read -r line matched; do
      candidate="$(printf '%s\n' "$matched" | grep -oE "$regex" | head -1 || true)"
      [[ -z "$candidate" ]] && continue

      if printf '%s\n' "$candidate" | grep -qiE '(example|placeholder|changeme|replace-me|dummy|fake|sample|test_secret)'; then
        continue
      fi

      if is_allowlisted "$candidate"; then
        continue
      fi

      findings=$((findings + 1))
      echo "$severity: $file:$line matched $name"
    done < <(grep -nE "$regex" "$file" 2>/dev/null || true)
  done
done

if [[ $findings -eq 0 ]]; then
  echo "No secrets detected"
  exit 0
fi

if [[ "$MODE" == "block" ]]; then
  echo "Blocking because potential secrets were detected"
  exit 1
fi

echo "Potential secrets detected; review before committing"
exit 0
