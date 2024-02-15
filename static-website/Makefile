SERVICE_NAME=cloudrun-static-website

start:
	docker-compose up --build
gcloud-auth:
	gcloud auth login
init-cloud-resources:
	gcloud storage buckets create gs://$$(gcloud config get project)-${SERVICE_NAME} --location=europe-west1 --pap --enable-autoclass --uniform-bucket-level-access
	gcloud iam service-accounts create ${SERVICE_NAME}
	make add-permissions
add-permissions:
	gcloud storage buckets add-iam-policy-binding gs://$$(gcloud config get project)-${SERVICE_NAME} \
		--member=serviceAccount:${SERVICE_NAME}@$$(gcloud config get project).iam.gserviceaccount.com \
		--role=roles/storage.legacyBucketReader
	gcloud storage buckets add-iam-policy-binding gs://$$(gcloud config get project)-${SERVICE_NAME} \
		--member=serviceAccount:${SERVICE_NAME}@$$(gcloud config get project).iam.gserviceaccount.com \
		--role=roles/storage.legacyObjectReader
copy-files-to-cloud-storage:
	gsutil -m cp ./website/* gs://$$(gcloud config get project)-${SERVICE_NAME}
deploy-cloud-run:
	gcloud beta run deploy ${SERVICE_NAME} \
		--source . --region europe-west1 --allow-unauthenticated \
		--port 80 \
		--execution-environment gen2 \
		--service-account=${SERVICE_NAME}@$$(gcloud config get project).iam.gserviceaccount.com \
		--add-volume=name=website,type=cloud-storage,bucket=$$(gcloud config get project)-${SERVICE_NAME},readonly=true \
		--add-volume-mount=volume=website,mount-path=/var/www/html
delete:
	gcloud run services delete ${SERVICE_NAME} --region europe-west1 --platform managed
	gcloud iam service-accounts delete ${SERVICE_NAME}@$$(gcloud config get project).iam.gserviceaccount.com
	gcloud storage rm -r gs://$$(gcloud config get project)-${SERVICE_NAME}
