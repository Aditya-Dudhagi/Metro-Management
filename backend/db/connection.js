import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    console.log("✅ Connected to MySQL server");

    // Create DB if not exists
    await db.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    await db.query(`USE \`${process.env.DB_NAME}\`;`);

    // Create tables
    await db.query(`
      CREATE TABLE IF NOT EXISTS stations (
        station_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS fares (
        fare_id INT AUTO_INCREMENT PRIMARY KEY,
        source_id INT,
        destination_id INT,
        price DECIMAL(5,2),
        FOREIGN KEY (source_id) REFERENCES stations(station_id),
        FOREIGN KEY (destination_id) REFERENCES stations(station_id)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS transactions (
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
    `);

    console.log("✅ Tables ready");

    // Initialize with sample data if tables are empty
    await initializeSampleData(db);

    return db;
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
  }
};

export default db;

// Function to initialize sample data only if tables are empty
async function initializeSampleData(db) {
  try {
    // Check if stations table has data
    const [stationRows] = await db.query(
      "SELECT COUNT(*) as count FROM stations"
    );
    const stationCount = stationRows[0].count;

    // Check if fares table has data
    const [fareRows] = await db.query("SELECT COUNT(*) as count FROM fares");
    const fareCount = fareRows[0].count;

    // Only insert if tables are empty
    if (stationCount === 0) {
      console.log("📝 Inserting initial stations data...");
      await db.query(`
        INSERT INTO stations (name) VALUES
        ('Swargate'),
        ('Mandai'),
        ('Railway Station'),
        ('Civil Court'),
        ('Ramwadi'),
        ('Vanaz')
      `);
      console.log("✅ Stations data inserted");
    }

    if (fareCount === 0) {
      console.log("📝 Inserting initial fares data...");
      await db.query(`
        INSERT INTO fares (source_id, destination_id, price)
        VALUES
        (1, 2, 10.00),
        (1, 3, 15.00),
        (1, 4, 20.00),
        (1, 5, 25.00),
        (1, 6, 30.00),
        (2, 3, 10.00),
        (2, 4, 15.00),
        (2, 5, 20.00),
        (2, 6, 25.00),
        (3, 4, 10.00),
        (3, 5, 15.00),
        (3, 6, 20.00),
        (4, 5, 10.00),
        (4, 6, 15.00),
        (5, 6, 10.00)
      `);
      console.log("✅ Fares data inserted");
    }

    if (stationCount > 0 && fareCount > 0) {
      console.log("ℹ️  Database already has data, skipping initialization");
    }
  } catch (err) {
    console.error("❌ Error initializing sample data:", err);
  }
}
