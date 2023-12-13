-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

-- Create available_times table
CREATE TABLE available_times (
  id SERIAL PRIMARY KEY,
  availability_date_time_start TIMESTAMPTZ,
  duration INTERVAL NOT NULL
);

-- Create appointments table
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  date_of_appt DATE NOT NULL,
  start_time TIME NOT NULL,
  duration INTERVAL NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_us (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_msg TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Create indexes for faster queries
CREATE INDEX idx_appointments_user_id ON appointments (user_id);
CREATE INDEX idx_appointments_date ON appointments (date_of_appt);
CREATE INDEX idx_appointments_start_time ON appointments (start_time);

-- Grant necessary permissions
GRANT SELECT, UPDATE, DELETE ON appointments TO authenticated;

-- Grant SELECT permission on available_times to everyone
GRANT SELECT ON available_times TO public;

