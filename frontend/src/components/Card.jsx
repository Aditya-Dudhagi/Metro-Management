import React, { useState } from "react";
import Button from "./Button";
import axios from "axios";

function Card() {
  const stations = [
    { id: 1, name: "Swargate" },
    { id: 2, name: "Mandai" },
    { id: 3, name: "Railway Station" },
    { id: 4, name: "Civil Court" },
    { id: 5, name: "Ramwadi" },
    { id: 6, name: "Vanaz" },
  ];

  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleBook = async () => {
    console.log("Button clicked");
    const userId = Math.floor(Math.random() * 4) + 1;
    try {
      if (source !== null && destination !== null && source !== destination) {
        await axios
          .post("//localhost:5000/api/tickets/book", {
            userId,
            sourceId: source,
            destinationId: destination,
          })
          .then((response) => {
            alert(`Ticket booked successfully! Fare: ₹${response.data.fare}`);
            setDestination(null)
            setSource(null)
          })
          .catch((error) => {
            console.error("Error booking ticket:", error);
          });
      } else {
        console.log("Please select valid source and destination");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        id="card"
        className="bg-white rounded-lg p-4 m-4 w-[500px] flex flex-col items-center"
      >
        <select
          value={source === null ? "" : source}
          onChange={(e) => setSource(Number(e.target.value))}
          className="border p-2 m-2 rounded-lg w-60"
        >
          <option value="">Select Source</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>

        <select
          value={destination === null ? "" : destination}
          onChange={(e) => setDestination(Number(e.target.value))}
          className="border p-2 m-2 rounded-lg w-60"
        >
          <option value="">Select Destination</option>
          {stations.map((station) => (
            <option key={station.id} value={station.id}>
              {station.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={handleBook} />
    </>
  );
}

export default Card;
