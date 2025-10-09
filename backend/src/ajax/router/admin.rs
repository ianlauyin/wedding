use axum::Router;
use axum::extract::{ConnectInfo, State};
use axum::http::StatusCode;
use axum::http::{HeaderMap, header::USER_AGENT};
use axum::routing::{get, post};

use framework::exception;
use framework::exception::error_code::{NOT_FOUND, VALIDATION_ERROR};
use framework::web::{body::Json, error::HttpResult};
use std::net::SocketAddr;
use wedding_interface::{LoginRequest, LoginResponse};

use crate::ajax::shared::cookie::{CookieName, get_cookie, remove_cookie, set_cookie};
use crate::db::AdminRecordCollection;
use crate::env;
use crate::exception::CoreRsResult;
use crate::state::SharedState;

pub fn admin_router() -> Router<SharedState> {
    Router::new()
        .route("/admin/record", get(get_login_record))
        .route("/admin/login", post(login))
        .route("/admin/logout", post(logout))
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
        .await?
    else {
        return Err(exception!(
            code = NOT_FOUND,
            message = "Login record not found"
        ))?;
    };

    Ok(Json(record.into()))
}

#[axum::debug_handler]
async fn logout(
    State(state): State<SharedState>,
    header: HeaderMap,
) -> HttpResult<(StatusCode, HeaderMap)> {
    let token = get_cookie(&header, CookieName::LoginToken);

    let header = remove_cookie(HeaderMap::new(), CookieName::LoginToken);

    if let Some(token) = token {
        let _ = AdminRecordCollection::from(state.db.clone())
            .remove_record(token)
            .await;
    }
    Ok((StatusCode::NO_CONTENT, header))
}

#[axum::debug_handler]
async fn login(
    State(state): State<SharedState>,
    request_header: HeaderMap,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Json(request): Json<LoginRequest>,
) -> HttpResult<(HeaderMap, Json<LoginResponse>)> {
    validate_login(&request)?;

    let user_agent = request_header
        .get(USER_AGENT)
        .ok_or(exception!(
            code = VALIDATION_ERROR,
            message = "User agent not found"
        ))?
        .to_str()?;
    let ip_address = addr.ip().to_string();

    let record = AdminRecordCollection::from(state.db.clone())
        .add_record(request.name, user_agent.to_string(), ip_address)
        .await?;

    let header = set_cookie(
        HeaderMap::new(),
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
    if !env::var("LOGIN_PASSWORD")?.eq(&request.password) {
        Err(exception!(
            code = VALIDATION_ERROR,
            message = "Invalid password"
        ))?;
    }
    Ok(())
}
