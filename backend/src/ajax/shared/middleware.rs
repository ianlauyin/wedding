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

pub async fn check_login_cookie(
    State(state): State<SharedState>,
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> HttpResult<Response> {
    if let Some(token) = get_cookie(&headers, CookieName::LoginToken) {
        if let Some(_) = AdminRecordCollection::from(state.db.clone())
            .get_record(token)
            .await
            .expect("Failed to get login record")
        {
            return Ok(next.run(request).await);
        }
    }

    Err(exception!(code = FORDIDDEN, message = "Unauthorized"))?
}
