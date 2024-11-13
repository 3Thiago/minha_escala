CREATE DATABASE IF NOT EXISTS escala;

CREATE USER IF NOT EXISTS 'my_user'@'%' IDENTIFIED BY 'my_password';

GRANT ALL PRIVILEGES ON escala_database.* TO 'my_user'@'%';

FLUSH PRIVILEGES;

-- CREATE TABLE services (
--     id INTEGER PRIMARY KEY,
--     today TEXT,
--     userName TEXT,
--     avatar TEXT,
--     func TEXT,
--     escala TEXT,
--     data TEXT
-- );
DELETE FROM `services` WHERE `name`="Thalisson";