-- Inserting sample data into the available_times table
-- all times are stored in UTC ... WTF!!!
INSERT INTO slots (appointment_date, appointment_time)
VALUES
  ('2023-12-19', '10:00:00'),
  ('2023-12-19', '10:30:00'),
  ('2023-12-19', '11:00:00'),
  ('2023-12-19', '11:30:00');

