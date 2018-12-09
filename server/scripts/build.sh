#!/usr/bin/env bash

mkdir -p build/

babel src --out-dir build --watch --verbose "$@"