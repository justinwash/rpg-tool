extern crate diesel;
extern crate dotenv;

use crate::schema::image::dsl::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

pub fn get_db_connection() -> PgConnection {
  dotenv().ok();

  let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
  PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

use crate::models::{Image, NewImage};

pub fn create_image<'a>(db: &PgConnection, image_url: &'a str) -> Image {
  use super::schema::image;

  let new_image = NewImage { url: image_url };

  let res = diesel::insert_into(image::table)
    .values(&new_image)
    .get_result(db);

  match res {
    Ok(i) => i,
    _ => image.filter(url.eq(url)).first(db).unwrap(),
  }
}

use crate::models::{NewUser, User};

pub fn create_user<'a>(db: &PgConnection, new_user: &NewUser) -> User {
  use super::schema::user;

  let res = diesel::insert_into(user::table)
    .values(new_user)
    .get_result(db);

  match res {
    Ok(i) => i,
    _ => panic!("broke"),
  }
}
