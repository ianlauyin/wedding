use firestore::{FirestoreDb, FirestoreDbOptions};

use crate::env;
use crate::exception::CoreRsResult;

pub async fn connect_db() -> CoreRsResult<FirestoreDb> {
    rustls::crypto::aws_lc_rs::default_provider()
        .install_default()
        .expect("Failed to install rustls crypto provider");

    let options = FirestoreDbOptions {
        google_project_id: env::var("FIRESTORE_PROJECT_ID")?,
        database_id: env::var("FIRESTORE_DATABASE_ID")?,
        max_retries: 3,
        firebase_api_url: None,
    };

    connect(options).await
}

#[cfg(debug_assertions)]
async fn connect(options: FirestoreDbOptions) -> CoreRsResult<FirestoreDb> {
    use framework::asset::asset_path;

    let key_path = asset_path("assets/wedding-service-account-key.json")?;
    Ok(FirestoreDb::with_options_service_account_key_file(options, key_path).await?)
}

#[cfg(not(debug_assertions))]
async fn connect(options: FirestoreDbOptions) -> CoreRsResult<FirestoreDb> {
    FirestoreDb::with_options(options)
        .await
        .map_err(|_| exception!(message = "Failed to connect to Firestore"))
}
