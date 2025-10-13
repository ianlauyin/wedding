use chrono::{DateTime, Local};
use firestore::FirestoreDb;
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

use crate::db::collection::CollectionExt;
use crate::exception::CoreRsResult;
use framework::log::ActionLogMessage;
use wedding_backend_macros::Collection;

#[derive(Serialize, Deserialize)]
pub struct LogRecord {
    id: String,
    date: DateTime<Local>,
    action: String,
    context: IndexMap<String, String>,
    error_code: Option<String>,
    error_message: Option<String>,
    trace: Option<String>,
}

impl From<ActionLogMessage> for LogRecord {
    fn from(message: ActionLogMessage) -> Self {
        let context = message
            .context
            .into_iter()
            .map(|(k, v)| (k.to_string(), v))
            .collect();

        Self {
            id: message.id,
            date: message.date.with_timezone(&Local),
            action: message.action,
            context,
            error_code: message.error_code,
            error_message: message.error_message,
            trace: message.trace,
        }
    }
}

#[derive(Collection, Clone)]
#[schema(LogRecord)]
pub struct LogRecordCollection(FirestoreDb);

impl LogRecordCollection {
    pub async fn add_record(&self, message: ActionLogMessage) -> CoreRsResult<LogRecord> {
        let log_record = LogRecord::from(message);
        self.insert(&log_record.id, &log_record).await
    }
}
