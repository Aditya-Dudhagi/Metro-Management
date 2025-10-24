import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// create database
await pool.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);

// Now switch to using the database
await pool.query(`USE \`${process.env.DB_NAME}\`;`);
async function initializeDatabase() {
  try {
    console.log("✅ Connected to MySQL server pool");

    await pool.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
    );
    await pool.query(`USE \`${process.env.DB_NAME}\`;`);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS stations (
        station_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS fares (
        fare_id INT AUTO_INCREMENT PRIMARY KEY,
        source_id INT,
        destination_id INT,
        price DECIMAL(5,2),
        FOREIGN KEY (source_id) REFERENCES stations(station_id),
        FOREIGN KEY (destination_id) REFERENCES stations(station_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `);

    await pool.query(`
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

    await initializeSampleData();
  } catch (err) {
    console.error("❌ MySQL connection error:", err);
  }
}

async function initializeSampleData() {
  try {
    const [stationRows] = await pool.query(
      "SELECT COUNT(*) as count FROM stations"
    );
    const [fareRows] = await pool.query("SELECT COUNT(*) as count FROM fares");

    if (stationRows[0].count === 0) {
      console.log("📝 Inserting initial stations data...");
      await pool.query(`
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

    if (fareRows[0].count === 0) {
      console.log("📝 Inserting initial fares data...");
      await pool.query(`
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

    // Add this check for users table
    const [userRows] = await pool.query("SELECT COUNT(*) as count FROM users");
    const userCount = userRows[0].count;

    if (userCount === 0) {
      console.log("📝 Inserting initial users data...");
      await pool.query(`
    INSERT INTO users (user_id, name, email, password) VALUES
    (1, 'John Doe', 'john@example.com', 'password123'),
    (2, 'Jane Smith', 'jane@example.com', 'password123'),
    (3, 'Mike Johnson', 'mike@example.com', 'password123'),
    (4, 'Sarah Wilson', 'sarah@example.com', 'password123')
  `);
      console.log("✅ Users data inserted");
    }

    console.log("ℹ️  Database initialized successfully");
  } catch (err) {
    console.error("❌ Error initializing sample data:", err);
  }
}

await initializeDatabase();

export default pool;
