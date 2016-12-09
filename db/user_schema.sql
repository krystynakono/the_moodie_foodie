DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL,
  happy string NOT NULL,
  sad STRING NOT NULL,
  angry STRING NOT NULL,
  surprised STRING NOT NULL,
  contempt STRING NOT NULL,
  disgust  STRING NOT NULL,
  fear STRING NOT NULL,
  neutral STRING NOT NULL
);
