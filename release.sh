#!/usr/bin/env bash
set -euo pipefail

bash ./scripts/docker_release.sh
bash ./scripts/gce_update.sh