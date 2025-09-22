use firestore::FirestoreDb;
use std::sync::Arc;

pub(in crate::ajax) type SharedState = Arc<AppState>;

#[derive(Clone)]
pub struct AppState {
    pub db: FirestoreDb,
}

impl AppState {
    pub fn init(db: FirestoreDb) -> SharedState {
        Arc::new(Self { db })
    }
}
