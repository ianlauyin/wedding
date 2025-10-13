use super::AdminRecord;
use wedding_interface::LoginResponse;

impl Into<LoginResponse> for AdminRecord {
    fn into(self) -> LoginResponse {
        LoginResponse {
            name: self.name,
            login_time: self.login_time,
        }
    }
}
