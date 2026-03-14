CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    jender VARCHAR(50) NOT NULL,
    done BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todos (title, name, jender, done) VALUES ('タスク1','山田太郎', '男性', false);