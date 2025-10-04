#!/usr/bin/env bash
set -euo pipefail
set -a; source .env; set +a

DOCKER_IMAGE="ianlauyin/wedding-app:latest"

gcloud compute ssh "${GCLOUD_VM_NAME}" \
  --account="${GCLOUD_ACCOUNT}" \
  --project="${GOOGLE_PROJECT_ID}" \
  --zone="${GCLOUD_ZONE}" \
  --command="docker pull ${DOCKER_IMAGE} && \
docker stop wedding-app || true && \
docker rm wedding-app || true && \
docker run -d \
  --name wedding-app \
  -p 8080:8080 \
  --restart unless-stopped \
  -e LOGIN_PASSWORD='${LOGIN_PASSWORD}' \
  -e GOOGLE_PROJECT_ID='${GOOGLE_PROJECT_ID}' \
  -e FIRESTORE_DATABASE_ID='${FIRESTORE_DATABASE_ID}' \
  ${DOCKER_IMAGE}"

  echo "Deployment complete"