#!/usr/bin/env bash

# Find the directory this script is in
script_dir="$(cd $(dirname "$0") && pwd)"

# Move to the project's root directory (relative to this script)
cd "${script_dir}/.."

# Run the docker container for development
docker build -t thoughtful-app-dev .
