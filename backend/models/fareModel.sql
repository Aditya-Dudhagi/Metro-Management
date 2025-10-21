CREATE TABLE fares (
  fare_id INT AUTO_INCREMENT PRIMARY KEY,
  source_id INT,
  destination_id INT,
  price DECIMAL(5,2),
  FOREIGN KEY (source_id) REFERENCES stations(station_id),
  FOREIGN KEY (destination_id) REFERENCES stations(station_id)
);
