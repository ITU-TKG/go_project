CREATE DATABASE IF NOT EXISTS testdb;
USE testdb;

CREATE TABLE IF NOT EXISTS todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    jender VARCHAR(50) NOT NULL DEFAULT '無回答',
    done BOOLEAN NOT NULL DEFAULT false,
    due_date DATE DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id       INT AUTO_INCREMENT PRIMARY KEY,
    email    VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO todos (title, name, jender, done, due_date) VALUES ('タスク1','山田太郎', '男性', false, '2026-01-01');
INSERT INTO users (email, password) VALUES ('test@example.com', 'dummy');