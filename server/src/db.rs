extern crate diesel;
extern crate dotenv;

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

pub fn create_image<'a>(conn: &PgConnection, url: &'a str) -> Image {
  use super::schema::image;

  let new_post = NewImage { url: url };

  diesel::insert_into(image::table)
    .values(&new_post)
    .get_result(conn)
    .expect("Error saving new post")
}
