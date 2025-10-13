use chrono::{DateTime, Local};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};

use framework::log::ActionLogMessage;

#[derive(Serialize, Deserialize)]
pub struct LogRecord {
    pub(super) id: String,
    pub(super) date: DateTime<Local>,
    pub(super) action: String,
    pub(super) context: IndexMap<String, String>,
    pub(super) error_code: Option<String>,
    pub(super) error_message: Option<String>,
    pub(super) trace: Option<String>,
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
