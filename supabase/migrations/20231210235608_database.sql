-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL
);

create type booked_type as enum ('reserved', 'available');

-- Create appointments table
CREATE TABLE appointment_details (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  user_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create available_times table
CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  appointment_date DATE NOT NULL, 
  appointment_time TIME NOT NULL,
  booked booked_type NOT NULL DEFAULT 'available',
  booked_user_id UUID REFERENCES users(id),
  appointment_details_id INTEGER REFERENCES appointment_details(id)
);


CREATE TABLE contact_us (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_msg TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);


-- Create indexes for faster queries
CREATE INDEX idx_appointments_user_id ON slots (appointment_date);

-- Grant necessary permissions
GRANT SELECT, UPDATE, DELETE ON appointment_details TO authenticated;


