use axum::http::{
    header::{COOKIE, SET_COOKIE},
    HeaderMap,
};

pub enum CookieName {
    LoginToken,
}

impl CookieName {
    pub fn str(&self) -> &str {
        match self {
            CookieName::LoginToken => "login_token",
        }
    }
}

pub fn set_cookie(header: &mut HeaderMap, name: CookieName, value: &str) {
    header.insert(
        SET_COOKIE,
        format!("{}={}; HttpOnly; Path=/", name.str(), value)
            .parse()
            .unwrap(),
    );
}

pub fn get_cookie(header: &HeaderMap, name: CookieName) -> Option<String> {
    let cookie_header = header.get(COOKIE)?.to_str().ok()?;

    for cookie in cookie_header.split(";") {
        if let Some((cookie_name, cookie_value)) = cookie.split_once("=") {
            if cookie_name.trim() == name.str() {
                return Some(cookie_value.trim().to_string());
            }
        }
    }

    None
}
