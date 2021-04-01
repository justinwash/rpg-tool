use crate::models::*;
use serde::{Deserialize, Serialize};
use warp::*;

pub fn create_user_request() -> impl Filter<Extract = (NewUser,), Error = warp::Rejection> + Clone {
  warp::body::content_length_limit(1024 * 16).and(warp::body::json())
}

pub fn update_user_request() -> impl Filter<Extract = (User,), Error = warp::Rejection> + Clone {
  warp::body::content_length_limit(1024 * 16).and(warp::body::json())
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GetUserSessionsRequest {
  pub user_id: f32,
}

pub fn get_user_sessions_request(
) -> impl Filter<Extract = (GetUserSessionsRequest,), Error = warp::Rejection> + Clone {
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
