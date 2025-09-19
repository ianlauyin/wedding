use std::path::PathBuf;

use firestore::{FirestoreDb, FirestoreDbOptions};

use crate::env;

pub async fn connect_db() -> FirestoreDb {
    rustls::crypto::aws_lc_rs::default_provider()
        .install_default()
        .expect("Failed to install rustls crypto provider");

    let options = FirestoreDbOptions {
        google_project_id: env::var("FIRESTORE_PROJECT_ID"),
        database_id: env::var("FIRESTORE_DATABASE_ID"),
        max_retries: 3,
        firebase_api_url: None,
    };

    if cfg!(debug_assertions) {
        connect_with_service_account_key_file(options).await
    } else {
        connect_with_gcloud_sdk(options).await
    }
}

async fn connect_with_service_account_key_file(options: FirestoreDbOptions) -> FirestoreDb {
    let key_path = PathBuf::from(".cargo/wedding-service-account-key.json");
    FirestoreDb::with_options_service_account_key_file(options, key_path)
        .await
        .expect("Failed to connect to Firestore")
}

async fn connect_with_gcloud_sdk(options: FirestoreDbOptions) -> FirestoreDb {
    FirestoreDb::with_options(options)
        .await
        .expect("Failed to connect to Firestore")
}
