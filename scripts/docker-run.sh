#!/usr/bin/env bash

# Find the directory this script is in
script_dir="$(cd $(dirname "$0") && pwd)"
project_dir="$(cd ${script_dir}/.. && pwd)"
project_base="$(basename "${project_dir}")"
docker_image="${project_base}-dev"
echo "running docker image: ${docker_image}"

# Move to the project's root directory (relative to this script)
cd "${script_dir}/.."

# Run the docker container for development with the project root mounted to /code, ignoring
# the node_modules directories
docker run --rm -it \
  -v ${PWD}:/code \
  -v /code/sst/node_modules \
  -v /code/sst/frontend/node_modules \
  -v ${PWD}/aws-credentials.txt:/root/.aws/credentials \
  -v ${PWD}/aws-config.txt:/root/.aws/config \
  -p 13557:13557 \
  -p 12557:12557 \
  -p 3000:3000 \
  ${docker_image}
