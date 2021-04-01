use crate::server::endpoint::*;
use warp::*;

pub fn gather_routes() -> impl Filter<Extract = impl warp::Reply, Error = warp::Rejection> + Clone {
  let hello = warp::path!("hello" / String)
    .map(|name| format!("Hello, {} from the http server!", name))
    .with(warp::cors().allow_any_origin());

  hello
    .or(create_user())
    .or(create_session())
    .or(get_session())
    .or(get_user_sessions()) // figure out how to group these into .or(user_endpoints()).or(session_endpoints())
    .or(update_user())
}

pub fn server() -> warp::Server<
  impl std::clone::Clone + warp::Filter<Extract = impl warp::Reply, Error = warp::Rejection>,
> {
  let routes = gather_routes();
  warp::serve(routes)
}
