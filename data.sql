 CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    photo_url TEXT DEFAULT 'https://i.stack.imgur.com/l60Hf.png', 
    is_admin BOOLEAN NOT NULL DEFAULT false
  );
  