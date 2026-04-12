#!/bin/sh
# Start backend in dev mode
cd "$(dirname "$0")/.."
exec npx ts-node-dev --respawn src/index.ts
