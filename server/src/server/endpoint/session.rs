use crate::db::*;
use crate::models::request::*;
use uuid::Uuid;
use warp::Filter;

pub fn create_session() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone
{
  warp::put()
    .and(warp::path("session"))
    .and(warp::path::end())
    .and(create_session_request())
    .map(|session_request: CreateSessionRequest| {
      let db = get_db_connection();
      let new_session = crate::db::session::create_session(&db, session_request.user_id as i32);
      println!("got create_session. Result: {:?}", new_session);
      warp::reply::json(&new_session.unwrap())
    })
    .with(warp::cors().allow_any_origin().allow_methods(vec!["PUT"]))
}

pub fn get_user_sessions(
) -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::path!("session")
    .and(warp::path::end())
    .and(get_user_sessions_request())
    .map(|get_user_sessions_request: GetUserSessionsRequest| {
      let db = get_db_connection();
      let user_sessions =
        crate::db::session::get_user_sessions(&db, get_user_sessions_request.user_id as i32);
      println!("got get_user_sessions. Result: {:?}", user_sessions);
      warp::reply::json(&user_sessions.unwrap())
    })
    .with(warp::cors().allow_any_origin().allow_methods(vec!["GET"]))
}

pub fn get_session() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  warp::path!("session" / Uuid)
    .map(|session_uuid| {
      let db = get_db_connection();
      let session = crate::db::session::get_session(&db, session_uuid);
      println!("got get_session. Result: {:?}", session);
      warp::reply::json(&session.unwrap())
    })
    .with(warp::cors().allow_any_origin().allow_methods(vec!["GET"]))
}
