-- psql -U Cameron -d fitnessapp -f /Users/Cameron/fitnessApp/fitness-server/db/fitness-seed.sql

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email TEXT NOT NULL,
  password TEXT NOT NULL 
);

INSERT INTO users (username, email, password) VALUES
('fitbitlover', 'fbl@test.com', 'password'),
('newUser', 'user@example.com', 'password');