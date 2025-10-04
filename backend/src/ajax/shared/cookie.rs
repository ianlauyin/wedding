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

pub fn set_cookie(mut header: HeaderMap, name: CookieName, value: &str) -> HeaderMap {
    // Set cookie to expire in 200 days (200 days * 24 hours * 60 minutes * 60 seconds)
    let max_age = 200 * 24 * 60 * 60;
    header.insert(
        SET_COOKIE,
        format!(
            "{}={}; HttpOnly; Path=/; Max-Age={}",
            name.as_str(),
            value,
            max_age
        )
        .parse()
        .unwrap(),
    );
    header
}

pub fn get_cookie(header: &HeaderMap, name: CookieName) -> Option<String> {
    let cookie_header = header.get(COOKIE)?.to_str().ok()?;

    for cookie in cookie_header.split(";") {
        if let Some((cookie_name, cookie_value)) = cookie.split_once("=") {
            if cookie_name.trim().eq(name.as_str()) {
                if cookie_value.trim().is_empty() {
                    return None;
                }
                return Some(cookie_value.trim().to_string());
            }
        }
    }

    None
}

pub fn remove_cookie(mut header: HeaderMap, name: CookieName) -> HeaderMap {
    header.insert(
        SET_COOKIE,
        format!("{}=; HttpOnly; Path=/; Max-Age=0", name.as_str())
            .parse()
            .unwrap(),
    );
    header
}
