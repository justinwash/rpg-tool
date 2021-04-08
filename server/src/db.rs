mod image;
pub mod session;
pub mod user;

pub use image::*;
pub use session::*;
pub use user::*;

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
