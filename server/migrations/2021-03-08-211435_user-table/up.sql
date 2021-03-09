CREATE TABLE public."user" (
	id SERIAL PRIMARY KEY,
  user_id varchar UNIQUE NOT NULL,
	username varchar NULL,
	first_name varchar NULL,
	last_name varchar NULL,
	image varchar NULL,
	email varchar NULL,
	note varchar NULL
);