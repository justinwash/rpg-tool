CREATE TABLE public."session" (
  id SERIAL PRIMARY KEY,
	uuid uuid UNIQUE NOT NULL,
	dm int8 NOT NULL,
	players int8[] NULL,
	state json NULL
);