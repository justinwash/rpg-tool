use crate::db::*;
use crate::models::request::*;
use crate::models::user::{NewUser, User};
use warp::Filter;

pub fn create_user() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::post()
    .and(warp::path("user"))
    .and(warp::path::end())
    .and(create_user_request())
    .map(|user: NewUser| {
      let db = get_db_connection();
      let new_user = crate::db::create_user(&db, &user);
      warp::reply::json(&new_user)
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
    )
}

pub fn update_user() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::put()
    .and(warp::path("user"))
    .and(warp::path::end())
    .and(update_user_request())
    .map(|user: User| {
      println!("{}", "got update user request");
      let db = get_db_connection();
      let updated_user = crate::db::update_user(&db, &user);
      warp::reply::json(&updated_user.unwrap())
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
        .allow_methods(vec!["PUT"]),
    )
}
