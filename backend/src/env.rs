use framework::exception;
use framework::exception::{CoreRsResult, Severity};

pub fn var(key: &str) -> CoreRsResult<String> {
    std::env::var(key).map_err(|_| {
        exception!(
            severity = Severity::Error,
            message = format!("Environment variable not set: {}", key)
        )
    })
}
