table! {
    image (id) {
        id -> Int4,
        url -> Varchar,
    }
}

table! {
    user (id) {
        id -> Int4,
        google_id -> Varchar,
        first_name -> Nullable<Varchar>,
        last_name -> Nullable<Varchar>,
        image -> Nullable<Varchar>,
        email -> Nullable<Varchar>,
        note -> Nullable<Varchar>,
        username -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(image, user,);
