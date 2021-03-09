extern crate diesel;
extern crate dotenv;

use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::models::{NewUser, User};

pub fn create_user<'a>(db: &PgConnection, new_user: &NewUser) -> User {
  use crate::schema::user;
  use crate::schema::user::dsl::*;

  let new_google_id = String::from(&new_user.google_id);
  let res = diesel::insert_into(user::table)
    .values(new_user)
    .get_result(db);

  match res {
    Ok(i) => i,
    _ => user.filter(google_id.eq(new_google_id)).first(db).unwrap(),
  }
}
