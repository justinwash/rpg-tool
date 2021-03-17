use crate::schema::user;
use serde::{Deserialize, Serialize};

#[derive(Queryable, Debug, Deserialize, Serialize, Clone)]
pub struct User {
  pub id: i32,
  pub google_id: String,
  pub username: Option<String>,
  pub first_name: Option<String>,
  pub last_name: Option<String>,
  pub image: Option<String>,
  pub email: Option<String>,
  pub note: Option<String>,
}

#[derive(Insertable, Debug, Deserialize, Serialize, Clone)]
#[table_name = "user"]
pub struct NewUser {
  pub google_id: String,
  pub first_name: String,
  pub last_name: String,
  pub image: String,
  pub email: String,
}
