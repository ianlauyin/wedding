use crate::db::guest_info::schema::GuestInfo;
use crate::exception::CoreRsResult;
use framework::exception;
use framework::exception::error_code::VALIDATION_ERROR;

pub struct GuestInfoValidator {
    original_guest: Option<GuestInfo>,
}

impl GuestInfoValidator {
    pub fn new(original_guest: Option<GuestInfo>) -> Self {
        Self { original_guest }
    }

    pub fn check_name(self, name: &str) -> CoreRsResult<Self> {
        if name.is_empty() {
            return Err(exception!(
                code = VALIDATION_ERROR,
                message = "Name is required"
            ));
        }
        Ok(self)
    }

    pub fn check_relationship(self, relationship: &str) -> CoreRsResult<Self> {
        if relationship.is_empty() {
            return Err(exception!(
                code = VALIDATION_ERROR,
                message = "Relationship is required"
            ));
        }
        Ok(self)
    }

    pub fn check_estimated_count(self, estimated_count: u32) -> CoreRsResult<Self> {
        if estimated_count == 0 {
            return Err(exception!(
                code = VALIDATION_ERROR,
                message = "Estimated count should be greater than 0"
            ));
        }
        Ok(self)
    }

    pub fn check_confirmed_count(self, confirmed_count_opt: Option<u32>) -> CoreRsResult<Self> {
        if let Some(original_guest) = &self.original_guest {
            if let Some(confirmed_count) = confirmed_count_opt {
                if confirmed_count > original_guest.estimated_count {
                    return Err(exception!(
                        code = VALIDATION_ERROR,
                        message = "Confirmed count cannot be greater than estimated count"
                    ));
                }
            }
            if original_guest.confirmed_count.is_some() && confirmed_count_opt.is_none() {
                return Err(exception!(
                    code = VALIDATION_ERROR,
                    message = "Confirmed count cannot be unset"
                ));
            }
        }
        Ok(self)
    }
}
