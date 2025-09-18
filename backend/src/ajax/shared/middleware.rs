use axum::{
    extract::{Request, State},
    http::{HeaderMap, StatusCode},
    middleware::Next,
    response::Response,
};

use super::cookie::{get_cookie, CookieName};
use crate::{ajax::state::SharedState, db::AdminRecordCollection};

pub async fn check_login_cookie(
    State(state): State<SharedState>,
    headers: HeaderMap,
    request: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    if let Some(token) = get_cookie(&headers, CookieName::LoginToken) {
        if let Some(_) = AdminRecordCollection::from(state.db.clone())
            .get_record(token)
            .await
            .expect("Failed to get login record")
        {
            return Ok(next.run(request).await);
        }
    }

    Err(StatusCode::UNAUTHORIZED)
}
