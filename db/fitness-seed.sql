-- psql -U Cameron -d fitnessapp -f /Users/Cameron/fitnessApp/fitness-server/db/fitness-seed.sql

DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS users;
DROP TYPE IF EXISTS goal_category;
DROP TYPE IF EXISTS goal_type;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL UNIQUE,
  email TEXT NOT NULL,
  password TEXT NOT NULL 
);

INSERT INTO users (username, email, password) VALUES
('fitbitlover', 'fbl@test.com', 'password'),
('newUser', 'user@example.com', 'password');

CREATE TYPE goal_category AS ENUM ('Fitness', 'Health');
CREATE TYPE goal_type AS ENUM ('Total', 'Work Up To');

CREATE TABLE goals (
  id serial PRIMARY KEY,
  user_id int REFERENCES users(id) ON DELETE CASCADE,
  category goal_category, 
  start_date DATE,
  end_date DATE,
  title TEXT,
  complete NUMERIC,
  goal NUMERIC,
  unit TEXT,
  type goal_type
);