#!/usr/bin/env bash

# Find the directory this script is in
script_dir="$(cd $(dirname "$0") && pwd)"
project_dir="$(cd ${script_dir}/.. && pwd)"
project_base="$(basename "${project_dir}")"
docker_image="${project_base}-dev"
echo "building docker image: ${docker_image}"

# Move to the project's root directory (relative to this script)
cd "${script_dir}/.."

# Run the docker container for development
docker build -t ${docker_image} .
