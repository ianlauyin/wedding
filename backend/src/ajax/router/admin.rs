use axum::{
    extract::{ConnectInfo, State},
    http::{header::USER_AGENT, HeaderMap, StatusCode},
    routing::{get, post},
    Json, Router,
};
use std::net::SocketAddr;

use crate::ajax::{
    shared::cookie::{get_cookie, set_cookie, CookieName},
    state::SharedState,
};
use crate::interface::login::{LoginRequest, LoginResponse};
use crate::{db::AdminRecordCollection, env};

pub fn login_router() -> Router<SharedState> {
    Router::new()
        .route("/admin/record", get(get_login_record))
        .route("/admin/login", post(login))
}

async fn get_login_record(
    State(state): State<SharedState>,
    header: HeaderMap,
) -> (StatusCode, Json<Option<LoginResponse>>) {
    if let Some(token) = get_cookie(&header, CookieName::LoginToken) {
        if let Some(record) = AdminRecordCollection::from(state.db.clone())
            .get_record(token)
            .await
            .expect("Failed to get login record")
        {
            return (StatusCode::OK, Json(Some(record.into())));
        }
    };

    (StatusCode::NOT_FOUND, Json(None))
}

async fn login(
    State(state): State<SharedState>,
    request_header: HeaderMap,
    ConnectInfo(addr): ConnectInfo<SocketAddr>,
    Json(request): Json<LoginRequest>,
) -> (StatusCode, HeaderMap, Json<Option<LoginResponse>>) {
    let expected_password = env::var("LOGIN_PASSWORD");

    let mut header = HeaderMap::new();

    if request.password != expected_password {
        return (StatusCode::UNAUTHORIZED, header, Json(None));
    }

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

    (StatusCode::OK, header, Json(Some(record.into())))
}
