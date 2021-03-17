extern crate diesel;
extern crate dotenv;

use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::models::{NewSession, Session};

use crate::schema::session;
use crate::schema::session::dsl::*;

use ::uuid::Uuid;

pub fn create_session<'a>(db: &PgConnection, user_id: i32) -> Result<Session, warp::Rejection> {
  let new_session = NewSession {
    uuid: Uuid::new_v4(),
    dm: user_id as i64,
    players: None,
    state: None,
  };

  let res = diesel::insert_into(session::table)
    .values(new_session)
    .get_result(db);

  match res {
    Ok(i) => Ok(i),
    _ => Err(warp::reject()),
  }
}

pub fn get_session<'a>(db: &PgConnection, session_uuid: Uuid) -> Result<Session, warp::Rejection> {
  let res = session.filter(uuid.eq(session_uuid)).first(db);

  match res {
    Ok(i) => Ok(i),
    _ => Err(warp::reject()),
  }
}
