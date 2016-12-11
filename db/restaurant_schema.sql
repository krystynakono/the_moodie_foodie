DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
id SERIAL PRIMARY KEY,
name TEXT NOT NULL,
rating INT,
rating_img TEXT,
url TEXT,
category VARCHAR,
phone VARCHAR,
image TEXT,
address1 VARCHAR,
address2 VARCHAR,
address3 VARCHAR,
lat FLOAT,
lng FLOAT,
user_id INT REFERENCES users(id)
);

