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
    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book Your Journey</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            From Station
          </label>
          <select
            value={source === null ? "" : source}
            onChange={(e) => setSource(Number(e.target.value))}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors bg-gray-50"
          >
            <option value="">Select Source Station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center">
          <div className="bg-cyan-100 rounded-full p-2">
            <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            To Station
          </label>
          <select
            value={destination === null ? "" : destination}
            onChange={(e) => setDestination(Number(e.target.value))}
            className="w-full border-2 border-gray-200 p-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors bg-gray-50"
          >
            <option value="">Select Destination Station</option>
            {stations.map((station) => (
              <option key={station.id} value={station.id}>
                {station.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4">
          <Button onClick={handleBook} />
        </div>
      </div>
    </div>
  );
}

export default Card;
