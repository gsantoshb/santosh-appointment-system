-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create available_times table
CREATE TABLE available_times (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time VARCHAR(5) NOT NULL,
  UNIQUE (date, time)
);

-- Create appointments table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  start_time VARCHAR(5) NOT NULL,
  end_time VARCHAR(5),
  code VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for faster queries
CREATE INDEX idx_appointments_user_id ON appointments (user_id);
CREATE INDEX idx_appointments_date ON appointments (date);
CREATE INDEX idx_appointments_start_time ON appointments (start_time);

-- Grant necessary permissions
GRANT SELECT, UPDATE, DELETE ON appointments TO authenticated;

-- Grant SELECT permission on available_times to everyone
GRANT SELECT ON available_times TO public;

-- Enable row-level security for appointments table
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
