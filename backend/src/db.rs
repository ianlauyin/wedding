use firestore::{FirestoreDb, FirestoreDbOptions};
use framework::asset::asset_path;

use crate::env;
use crate::exception::CoreRsResult;

mod admin_record;
mod ext;
mod guest_info;
mod log_record;

pub use admin_record::AdminRecordCollection;
pub use guest_info::GuestInfoCollection;
pub use log_record::LogRecordCollection;

pub async fn connect() -> CoreRsResult<FirestoreDb> {
    rustls::crypto::aws_lc_rs::default_provider()
        .install_default()
        .expect("Failed to install rustls crypto provider");

    let options = FirestoreDbOptions {
        google_project_id: env::var("GOOGLE_PROJECT_ID")?,
        database_id: env::var("FIRESTORE_DATABASE_ID")?,
        max_retries: 3,
        firebase_api_url: None,
    };

    create_instance(options).await
}

#[cfg(debug_assertions)]
pub async fn create_instance(options: FirestoreDbOptions) -> CoreRsResult<FirestoreDb> {
    let key_path = asset_path("assets/wedding-service-account-key.json")?;
    Ok(FirestoreDb::with_options_service_account_key_file(options, key_path).await?)
}

#[cfg(not(debug_assertions))]
pub async fn create_instance(options: FirestoreDbOptions) -> CoreRsResult<FirestoreDb> {
    Ok(FirestoreDb::with_options(options).await?)
}
