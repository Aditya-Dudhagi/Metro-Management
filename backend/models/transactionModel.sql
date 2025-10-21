CREATE TABLE transactions (
  txn_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  source_id INT,
  destination_id INT,
  fare DECIMAL(5,2),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (source_id) REFERENCES stations(station_id),
  FOREIGN KEY (destination_id) REFERENCES stations(station_id)
);
