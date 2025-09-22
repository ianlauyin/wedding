use axum::{
    extract::{Request, State},
    http::HeaderMap,
    middleware::Next,
    response::Response,
};
use framework::exception;
use framework::{exception::error_code::FORDIDDEN, web::error::HttpResult};

use super::cookie::{CookieName, get_cookie};
use crate::{ajax::state::SharedState, db::AdminRecordCollection};

pub async fn verify_admin_session(
    State(state): State<SharedState>,
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> HttpResult<Response> {
    let token = get_cookie(&headers, CookieName::LoginToken)
        .ok_or(exception!(code = FORDIDDEN, message = "Token not found"))?;

    AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await?
        .ok_or(exception!(
            code = FORDIDDEN,
            message = "Login record not found"
        ))?;

    Ok(next.run(request).await)
}
