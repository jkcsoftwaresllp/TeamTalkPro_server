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
