extern crate diesel;
extern crate dotenv;

use crate::models::Session;
use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::schema::user;
use crate::schema::user::dsl::*;

use crate::models::{NewUser, User};

pub fn create_user<'a>(db: &PgConnection, new_user: &NewUser) -> User {
  let new_google_id = String::from(&new_user.google_id);
  let res = diesel::insert_into(user::table)
    .values(new_user)
    .get_result(db);

  match res {
    Ok(i) => i,
    _ => user.filter(google_id.eq(new_google_id)).first(db).unwrap(),
  }
}

pub fn update_user<'a>(db: &PgConnection, updated_user: &User) -> Result<User, warp::Rejection> {
  diesel::update(user.filter(id.eq(updated_user.id)))
    .set(username.eq(&updated_user.username))
    .get_result::<User>(db)
    .expect("Error updating user");

  let res = user.filter(id.eq(updated_user.id)).first(db);

  match res {
    Ok(i) => Ok(i),
    _ => Err(warp::reject()),
  }
}

pub fn _get_users_in_session<'a>(
  db: &PgConnection,
  session: Session,
) -> Result<Vec<User>, warp::Rejection> {
  let mut users: Vec<User> = Vec::new();
  let mut user_ids = vec![session.dm];

  match session.players {
    Some(mut players) => {
      user_ids.append(&mut players);
    }
    _ => {}
  }

  match user.filter(id.eq_any(user_ids)).load::<User>(db) {
    Ok(mut u) => {
      users.append(&mut u);
    }
    _ => {}
  };

  println!("{:?}", users);
  Ok(users)
}
