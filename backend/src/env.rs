pub fn var(key: &str) -> String {
    std::env::var(key).expect(&format!("{} environment variable must be set", key))
}
