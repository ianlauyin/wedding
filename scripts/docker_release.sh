#!/usr/bin/env bash
set -euo pipefail

DOCKER_IMAGE="ianlauyin/wedding-app:latest"

docker build --platform linux/amd64 -t "${DOCKER_IMAGE}" .
docker push "${DOCKER_IMAGE}"