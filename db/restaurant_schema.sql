DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
id SERIAL PRIMARY KEY,
name STRING NOT NULL,
rating INT,
rating_img STRING,
url TEXT,
category VARCHAR,
phone VARCHAR,
image STRING,
address STRING,
lat FLOAT,
lng FLOAT,
user_id INT FOREIGN KEY REFERENCES users(user_id)
);
