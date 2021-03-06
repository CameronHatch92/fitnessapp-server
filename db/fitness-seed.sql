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

-- hashed password for password123

INSERT INTO users (username, email, password) VALUES
('fitbitlover', 'fbl@test.com', '$2a$10$QP7MEsihzIGYkJjd1Ihopel0jjX7d2.L1e6rAsVLXu2gLjHLzFINO'),
('newUser', 'user@example.com', '$2a$10$QP7MEsihzIGYkJjd1Ihopel0jjX7d2.L1e6rAsVLXu2gLjHLzFINO');

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

INSERT INTO goals (user_id, category, start_date, end_date, title,
  complete, goal, unit, type) VALUES
  (1, 'Fitness', '2019-1-1', '2019-2-1', 'Run 20 miles', 10, 20, 'miles', 'Total'),
  (1, 'Health', '2019-1-1', '2019-4-1', 'Lose 5 Pounds', 2, 5, 'pounds', 'Total');
  