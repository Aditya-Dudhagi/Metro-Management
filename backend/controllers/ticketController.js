import db from "../db/connection.js";

// 🎟 Book a ticket
export const bookTicket = async (req, res) => {
  const { userId, sourceId, destinationId } = req.body;

  try {
    // 1️⃣ Get the fare between source & destination
    const [fareRows] = await db.query(
      "SELECT price FROM fares WHERE source_id = ? AND destination_id = ?",
      [sourceId, destinationId]
    );

    if (fareRows.length === 0) {
      return res.status(404).json({ message: "Fare not found for this route" });
    }

    const fare = fareRows[0].price;

    // 2️⃣ Insert new transaction
    const [result] = await db.query(
      "INSERT INTO transactions (user_id, source_id, destination_id, fare) VALUES (?, ?, ?, ?)",
      [userId, sourceId, destinationId, fare]
    );

    // 3️⃣ Respond success
    res.status(201).json({
      message: "Ticket booked successfully",
      ticketId: result.insertId,
      fare,
    });
  } catch (error) {
    console.error("❌ Error booking ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🎫 Get all tickets of a user
export const getUserTickets = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all transactions for the given user
    const [rows] = await db.query(
      `
      SELECT 
        t.txn_id,
        s1.name AS source_station,
        s2.name AS destination_station,
        t.fare,
        t.timestamp
      FROM transactions t
      JOIN stations s1 ON t.source_id = s1.station_id
      JOIN stations s2 ON t.destination_id = s2.station_id
      WHERE t.user_id = ?
      ORDER BY t.timestamp DESC
      `,
      [userId]
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Error fetching tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
