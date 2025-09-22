use framework::{asset::asset_path, exception::Exception};
use tower_http::services::{ServeDir, ServeFile};

// Update after frontend ready
pub fn html() -> Result<ServeDir<ServeFile>, Exception> {
    let asset_path = asset_path("assets/web")?;
    let index_path = asset_path.join("index.html");
    Ok(ServeDir::new(asset_path).fallback(ServeFile::new(index_path)))
}
