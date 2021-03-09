use crate::schema::image;

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
