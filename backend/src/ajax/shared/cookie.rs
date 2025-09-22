use axum::http::{
    HeaderMap,
    header::{COOKIE, SET_COOKIE},
};

pub enum CookieName {
    LoginToken,
}

impl CookieName {
    pub fn as_str(&self) -> &str {
        match self {
            CookieName::LoginToken => "login_token",
        }
    }
}

pub fn set_cookie(header: &mut HeaderMap, name: CookieName, value: &str) {
    header.insert(
        SET_COOKIE,
        format!("{}={}; HttpOnly; Path=/", name.as_str(), value)
            .parse()
            .unwrap(),
    );
}

pub fn get_cookie(header: &HeaderMap, name: CookieName) -> Option<String> {
    let cookie_header = header.get(COOKIE)?.to_str().ok()?;

    for cookie in cookie_header.split(";") {
        if let Some((cookie_name, cookie_value)) = cookie.split_once("=") {
            if cookie_name.trim().eq(name.as_str()) {
                return Some(cookie_value.trim().to_string());
            }
        }
    }

    None
}
