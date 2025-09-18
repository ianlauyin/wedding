use firestore::FirestoreDb;
use std::sync::Arc;

use crate::db::connect_db;

pub(in crate::ajax) type SharedState = Arc<AppState>;

#[derive(Clone)]
pub struct AppState {
    pub db: FirestoreDb,
}

impl AppState {
    pub async fn init() -> SharedState {
        Arc::new(Self {
            db: connect_db().await,
        })
    }
}
