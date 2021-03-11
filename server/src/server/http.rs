use crate::db::*;
use crate::models::*;
use warp::*;

pub fn setup() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  fn add_user_request() -> impl Filter<Extract = (NewUser,), Error = warp::Rejection> + Clone {
    warp::body::content_length_limit(1024 * 16).and(warp::body::json())
  }

  use serde::{Deserialize, Serialize};
  #[derive(Debug, Serialize, Deserialize)]
  struct SessionRequest {
    user_id: String,
    session_uuid: uuid::Uuid,
  }
  fn session_request() -> impl Filter<Extract = (SessionRequest,), Error = warp::Rejection> + Clone
  {
    warp::body::content_length_limit(1024 * 16).and(warp::body::json())
  }

  let hello = warp::path!("hello" / String)
    .map(|name| format!("Hello, {} from the http server!", name))
    .with(warp::cors().allow_any_origin());

  let add_user = warp::post()
    .and(warp::path("user"))
    .and(warp::path::end())
    .and(add_user_request())
    .map(|user: NewUser| {
      let db = get_db_connection();
      let new_user = create_user(&db, &user);
      format!("got add_user request and created user: {:?}", new_user)
    })
    .with(
      warp::cors()
        .allow_any_origin()
        .allow_headers(vec![
          "User-Agent",
          "Sec-Fetch-Mode",
          "Referer",
          "Origin",
          "Access-Control-Request-Method",
          "Access-Control-Request-Headers",
          "content-type",
        ])
        .allow_methods(vec!["POST"]),
    );

  let session = warp::post()
    .and(warp::path("session"))
    .and(warp::path::end())
    .and(session_request())
    .map(|session_request: SessionRequest| {
      // let db = get_db_connection();
      // let new_user = create_user(&db, &user);
      format!(
        "got add_user request and created user: {:?}",
        session_request
      )
    })
    .with(
      warp::cors()
        .allow_any_origin()
        .allow_headers(vec![
          "User-Agent",
          "Sec-Fetch-Mode",
          "Referer",
          "Origin",
          "Access-Control-Request-Method",
          "Access-Control-Request-Headers",
          "content-type",
        ])
        .allow_methods(vec!["POST"]),
    );

  hello.or(add_user).or(session)
}

pub fn server() -> warp::Server<
  impl std::clone::Clone + warp::Filter<Extract = impl warp::Reply, Error = warp::Rejection>,
> {
  let routes = setup();
  warp::serve(routes)
}
