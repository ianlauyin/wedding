use firestore::FirestoreDb;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::db::collection::ext::CollectionExt;
use crate::exception::CoreRsResult;

#[derive(Serialize, Deserialize)]
pub struct GuestInfo {
    id: Uuid,
    name: String,
}

impl GuestInfo {
    fn new(name: String) -> Self {
        let id = Uuid::new_v4();
        Self { id, name }
    }
}

pub struct GuestInfoCollection(FirestoreDb);

impl From<FirestoreDb> for GuestInfoCollection {
    fn from(db: FirestoreDb) -> Self {
        Self(db)
    }
}

impl CollectionExt for GuestInfoCollection {
    type Data = GuestInfo;
    fn collection_id(&self) -> &str {
        "guest_info"
    }
    fn db(&self) -> &FirestoreDb {
        &self.0
    }
}
