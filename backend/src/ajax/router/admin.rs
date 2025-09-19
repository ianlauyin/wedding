use axum::{
    Router,
    extract::{ConnectInfo, State},
    http::{HeaderMap, header::USER_AGENT},
    routing::{get, post},
};

use framework::exception;
use framework::exception::error_code::BAD_REQUEST;
use framework::web::{body::Json, error::HttpResult};
use std::net::SocketAddr;
use wedding_interface::{LoginRequest, LoginResponse};

use crate::ajax::{
    shared::cookie::{CookieName, get_cookie, set_cookie},
    state::SharedState,
};
use crate::db::AdminRecordCollection;
use crate::env;

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
    let Some(token) = get_cookie(&header, CookieName::LoginToken) else {
        return Err(exception!(code = BAD_REQUEST, message = "Token not found"))?;
    };

    let Some(record) = AdminRecordCollection::from(state.db.clone())
        .get_record(token)
        .await
        .expect("Failed to get login record")
    else {
        return Err(exception!(
            code = BAD_REQUEST,
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
    let expected_password = env::var("LOGIN_PASSWORD");

    if request.password != expected_password {
        Err(exception!(code = BAD_REQUEST, message = "Invalid password"))?;
    }

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
