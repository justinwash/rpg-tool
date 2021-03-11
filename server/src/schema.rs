table! {
    image (id) {
        id -> Int4,
        url -> Varchar,
    }
}

table! {
    session (id) {
        id -> Int4,
        uuid -> Uuid,
        dm -> Int8,
        players -> Nullable<Array<Int8>>,
        state -> Nullable<Json>,
    }
}

table! {
    user (id) {
        id -> Int4,
        google_id -> Varchar,
        username -> Nullable<Varchar>,
        first_name -> Nullable<Varchar>,
        last_name -> Nullable<Varchar>,
        image -> Nullable<Varchar>,
        email -> Nullable<Varchar>,
        note -> Nullable<Varchar>,
    }
}

allow_tables_to_appear_in_same_query!(
    image,
    session,
    user,
);
