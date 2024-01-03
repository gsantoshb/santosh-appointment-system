-- Inserting sample data into the available_times table
-- all times are stored in UTC ... WTF!!!
INSERT INTO slots (appointment_date, appointment_time)
VALUES
  ('2024-01-02', '10:00:00'),
  ('2024-01-02', '10:30:00'),
  ('2024-01-02', '11:00:00'),
  ('2024-01-02', '11:30:00'),
  ('2024-01-03', '10:00:00'),
  ('2024-01-03', '10:30:00'),
  ('2024-01-03', '11:00:00'),
  ('2024-01-03', '11:30:00');

