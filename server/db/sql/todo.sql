CREATE DATABASE todoDB;
CREATE USER donna WITH PASSWORD '112696';
ALTER ROLE donna WITH PASSWORD '112696';
GRANT ALL PRIVILEGES ON DATABASE todoDB TO donna;

-- Creating table
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  todo TEXT,
  isCompleted BOOLEAN
);

-- access all data from table
SELECT * FROM todo;

-- alter table
ALTER TABLE todo RENAME COLUMN todo TO description;