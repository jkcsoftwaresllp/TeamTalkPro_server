-- Users table (simplified)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    avatar_url TEXT
);

-- Chats table (for group and 1:1 chats)
CREATE TABLE chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    is_group BOOLEAN,
    name VARCHAR(255),
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Chat Members table
CREATE TABLE chat_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    user_id INT,
    role ENUM('admin', 'member') DEFAULT 'member',
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Messages table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    sender_id INT,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS teamtalk;

-- Select the database
USE teamtalk;

-- Example messages table (you'll expand this as needed for module 3.5)
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id INT,
    sender_id INT,
    content TEXT,
    type ENUM('text', 'image', 'file', 'reply', 'forward') DEFAULT 'text',
    reply_to INT DEFAULT NULL,
    forwarded_from INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- message reaction table
CREATE TABLE IF NOT EXISTS message_reactions (
  message_id INT NOT NULL,
  user_id INT NOT NULL,
  reaction VARCHAR(10) NOT NULL,
  reacted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (message_id, user_id),
  FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
