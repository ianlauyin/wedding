use firestore::FirestoreDb;

use crate::db::ext::CollectionExt;
use crate::exception::CoreRsResult;
use framework::log::ActionLogMessage;
use wedding_backend_macros::Collection;

mod schema;
use schema::LogRecord;

#[derive(Collection, Clone)]
#[schema(LogRecord)]
pub struct LogRecordCollection(FirestoreDb);

impl LogRecordCollection {
    pub async fn add_record(&self, message: ActionLogMessage) -> CoreRsResult<LogRecord> {
        let log_record = LogRecord::from(message);
        self.insert(&log_record.id, &log_record).await
    }
}
