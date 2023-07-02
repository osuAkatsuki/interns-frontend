#!/bin/sh

set -e

if [[ -n "$KUBERNETES" ]]; then
  source /vault/secrets/secrets.txt
fi

nginx -g "daemon off;"
