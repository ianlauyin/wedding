use firestore::FirestoreDb;
use framework::log::{ActionLogAppender, ActionLogMessage};

use crate::db::LogRecordCollection;

pub struct FirestoreAppender(LogRecordCollection);

impl FirestoreAppender {
    pub fn new(db: FirestoreDb) -> Self {
        Self(LogRecordCollection::from(db))
    }
}

impl ActionLogAppender for FirestoreAppender {
    fn append(&self, action_log: ActionLogMessage) {
        let collection = self.0.clone();
        tokio::spawn(async move {
            let _ = collection.add_record(action_log).await;
        });
    }
}
