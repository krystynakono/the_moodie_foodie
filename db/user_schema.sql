DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL,
  happy VARCHAR,
  sad VARCHAR,
  angry VARCHAR,
  surprised VARCHAR,
  contempt VARCHAR,
  disgust  VARCHAR,
  fear VARCHAR,
  neutral VARCHAR
);
