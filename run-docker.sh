#!/bin/bash

set -e

echo "Building Docker image"
docker build -t slack-pokemon-emoji .
echo "Docker image successfully built"

echo "Running emoji upload"
docker run --rm -it slack-pokemon-emoji "$@"
