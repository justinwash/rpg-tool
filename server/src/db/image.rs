extern crate diesel;
extern crate dotenv;

use diesel::pg::PgConnection;
use diesel::prelude::*;

use crate::models::{Image, NewImage};

pub fn create_image<'a>(db: &PgConnection, image_url: &'a str) -> Image {
  use crate::schema::image;
  use crate::schema::image::dsl::*;

  let new_image = NewImage { url: image_url };

  let res = diesel::insert_into(image::table)
    .values(&new_image)
    .get_result(db);

  match res {
    Ok(i) => i,
    _ => image.filter(url.eq(url)).first(db).unwrap(),
  }
}
