use crate::models::*;
use serde::{Deserialize, Serialize};
use warp::*;

pub fn add_user_request() -> impl Filter<Extract = (NewUser,), Error = warp::Rejection> + Clone {
  warp::body::content_length_limit(1024 * 16).and(warp::body::json())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateSessionRequest {
  pub user_id: f32,
}

pub fn create_session_request(
) -> impl Filter<Extract = (CreateSessionRequest,), Error = warp::Rejection> + Clone {
  warp::body::content_length_limit(1024 * 16).and(warp::body::json())
}
