use std::path::PathBuf;

use firestore::{FirestoreDb, FirestoreDbOptions};

use crate::env;

pub async fn connect_db() -> FirestoreDb {
    rustls::crypto::aws_lc_rs::default_provider()
        .install_default()
        .expect("Failed to install rustls crypto provider");

    // For Local development
    let key_path = PathBuf::from(".cargo/wedding-service-account-key.json");
    let options = FirestoreDbOptions {
        google_project_id: env::var("FIRESTORE_PROJECT_ID"),
        database_id: env::var("FIRESTORE_DATABASE_ID"),
        max_retries: 3,
        firebase_api_url: None,
    };

    FirestoreDb::with_options_service_account_key_file(options, key_path)
        .await
        .expect("Failed to connect to Firestore")
}
