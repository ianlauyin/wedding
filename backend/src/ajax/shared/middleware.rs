use axum::{
    extract::{Request, State},
    http::HeaderMap,
    middleware::Next,
    response::Response,
};
use framework::exception;
use framework::{exception::error_code::FORDIDDEN, web::error::HttpResult};
use tracing::debug;

use super::cookie::{CookieName, get_cookie};
use crate::{db::AdminRecordCollection, state::SharedState};

pub async fn verify_admin_session(
    State(state): State<SharedState>,
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> HttpResult<Response> {
    let token = get_cookie(&headers, CookieName::LoginToken)
        .ok_or(exception!(code = FORDIDDEN, message = "Token not found"))?;

    let admin_record = AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await?
        .ok_or(exception!(
            code = FORDIDDEN,
            message = "Login record not found"
        ))?;

    debug!(
        name = "admin_name",
        admin_name = admin_record.name(),
        "context"
    );

    Ok(next.run(request).await)
}
