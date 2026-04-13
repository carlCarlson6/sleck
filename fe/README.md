# Sleck Frontend (Vite + React + TypeScript)

This is the frontend scaffold for Sleck, created with Vite, React, and TypeScript.

## Getting Started

### Local development (standalone)

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy the example environment file and fill in any required values:

   ```sh
   cp .env.example .env
   # Edit .env as needed
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

The app will be available at http://localhost:5173 by default.

### Local development (Docker Compose)

You can also run the frontend as part of the full stack using Docker Compose:

1. Ensure you have a `.env` file (see `.env.example`).
2. From the `infrastructure/` directory, run:
   ```sh
   docker compose up --build
   ```

- The frontend will be available at [http://localhost:5173](http://localhost:5173)
- The backend API will be available at [http://localhost:4000](http://localhost:4000)

## Stack and Baseline Libraries

- [Vite](https://vitejs.dev/) (build tool)
- [React](https://react.dev/) (UI framework)
- [TypeScript](https://www.typescriptlang.org/) (type safety)
- [Zustand](https://zustand-demo.pmnd.rs/) (local state management)
- [@tanstack/react-query](https://tanstack.com/query/latest) (server state management)
- [Zod](https://zod.dev/) (schema validation)
- [tRPC](https://trpc.io/) (typed API client, ready for backend wiring)
- [Clerk](https://clerk.com/) (authentication, ready for backend wiring)

## Project Structure

- `src/` — Main source code
  - `api/` — API clients and tRPC wiring (to be implemented)
  - `state/` — Zustand stores (to be implemented)
  - `providers/` — React context providers (to be implemented)
  - `features/` — Feature modules (to be implemented)

## Notes

- The Vite React starter UI has been removed in favor of the Sleck application shell.
- No product flows or backend wiring are implemented yet.
- All baseline libraries are installed and ready for use.
- For backend API and Clerk integration, see future tasks.


This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
