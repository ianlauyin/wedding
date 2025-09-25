use axum::Router;
use axum::extract::{ConnectInfo, State};
use axum::http::{HeaderMap, header::USER_AGENT};
use axum::routing::{get, post};

use framework::exception;
use framework::exception::error_code::{NOT_FOUND, VALIDATION_ERROR};
use framework::web::{body::Json, error::HttpResult};
use std::net::SocketAddr;
use wedding_interface::{LoginRequest, LoginResponse};

use crate::ajax::shared::cookie::{CookieName, get_cookie, set_cookie};
use crate::ajax::state::SharedState;
use crate::db::AdminRecordCollection;
use crate::env;
use crate::exception::CoreRsResult;

pub fn admin_router() -> Router<SharedState> {
    Router::new()
        .route("/admin/record", get(get_login_record))
        .route("/admin/login", post(login))
}

#[axum::debug_handler]
async fn get_login_record(
    State(state): State<SharedState>,
    header: HeaderMap,
) -> HttpResult<Json<LoginResponse>> {
    let token = get_cookie(&header, CookieName::LoginToken).ok_or(exception!(
        code = VALIDATION_ERROR,
        message = "Token not found"
    ))?;

    let Some(record) = AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await
        .expect("Failed to get login record")
    else {
        return Err(exception!(
            code = NOT_FOUND,
            message = "Login record not found"
        ))?;
    };

    Ok(Json(record.into()))
}

#[axum::debug_handler]
async fn login(
    State(state): State<SharedState>,
    request_header: HeaderMap,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Json(request): Json<LoginRequest>,
) -> HttpResult<(HeaderMap, Json<LoginResponse>)> {
    validate_login(&request)?;

    let mut header = HeaderMap::new();
    let user_agent = request_header.get(USER_AGENT).unwrap().to_str().unwrap();
    let ip_address = addr.ip().to_string();

    let record = AdminRecordCollection::from(state.db.clone())
        .add_record(request.name, user_agent.to_string(), ip_address)
        .await
        .expect("Failed to add login record");

    set_cookie(
        &mut header,
        CookieName::LoginToken,
        &record.token().to_string(),
    );

    Ok((header, Json(record.into())))
}

fn validate_login(request: &LoginRequest) -> CoreRsResult<()> {
    if request.name.is_empty() {
        Err(exception!(
            code = VALIDATION_ERROR,
            message = "Name is empty"
        ))?;
    }
    if env::var("LOGIN_PASSWORD")?.eq(&request.password) {
        Err(exception!(
            code = VALIDATION_ERROR,
            message = "Invalid password"
        ))?;
    }
    Ok(())
}
