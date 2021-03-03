#[derive(Queryable, Debug)]
pub struct Image {
  pub id: i32,
  pub url: String,
}

use super::schema::image;

#[derive(Insertable, Debug)]
#[table_name = "image"]
pub struct NewImage<'a> {
  pub url: &'a str,
}
