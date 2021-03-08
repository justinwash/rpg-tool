use serde::{Deserialize, Serialize};

use super::schema::image;

#[derive(Queryable, Debug)]
pub struct Image {
  pub id: i32,
  pub url: String,
}

#[derive(Insertable, Debug)]
#[table_name = "image"]
pub struct NewImage<'a> {
  pub url: &'a str,
}

use super::schema::user;

#[derive(Queryable, Debug)]
pub struct User {
  pub id: i32,
  pub google_id: String,
  pub first_name: Option<String>,
  pub last_name: Option<String>,
  pub image: Option<String>,
  pub email: Option<String>,
  pub note: Option<String>,
  pub username: Option<String>,
}

#[derive(Insertable, Debug, Deserialize, Serialize)]
#[table_name = "user"]
pub struct NewUser {
  pub google_id: String,
  pub first_name: String,
  pub last_name: String,
  pub image: String,
  pub email: String,
}
