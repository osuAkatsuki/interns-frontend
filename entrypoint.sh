#!/usr/bin/env bash
set -e

if [[ -n "$KUBERNETES" ]]; then
  source /vault/secrets/secrets.txt
  node '/usr/src/app/build/injectEnv.js'
fi

nginx -g "daemon off;"
