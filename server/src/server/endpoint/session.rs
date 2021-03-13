use crate::db::*;
use crate::models::request::*;
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
      format!("got create_session. created session: {:?}", new_session)
    })
    .with(warp::cors().allow_any_origin().allow_methods(vec!["PUT"]))
}

// let get_session = warp::post()
// .and(warp::path("session"))
// .and(warp::path::end())
// .and(session_request())
// .map(|session_request: SessionRequest| format!("got session request: {:?}", session_request))
// .with(
//   warp::cors()
//     .allow_any_origin()
//     .allow_headers(vec![
//       "User-Agent",
//       "Sec-Fetch-Mode",
//       "Referer",
//       "Origin",
//       "Access-Control-Request-Method",
//       "Access-Control-Request-Headers",
//       "content-type",
//     ])
//     .allow_methods(vec!["GET"]),
// );
