#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")" && source "common.sh"

mkdir -p lib/

message "Building with watch"
babel src --out-dir lib --watch --verbose "$@"