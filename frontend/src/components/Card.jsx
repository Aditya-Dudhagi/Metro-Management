import React, { useState } from "react";
import Button from "./Button";

function Card() {
  const stations = [
    "Swargate",
    "Mandai",
    "Railway Station",
    "Civil Court",
    "Ramwadi",
    "Vanaz",
  ];

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  

  return (
    <>
      <div
        id="card"
        className="bg-white rounded-lg p-4 m-4 w-[500px] flex flex-col items-center"
      >
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="border p-2 m-2 rounded-lg w-60"
        >
          <option value="">Select Source</option>
          {stations.map((station, i) => (
            <option key={i} value={station}>
              {station}
            </option>
          ))}
        </select>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border p-2 m-2 rounded-lg w-60"
        >
          <option value="">Select Destination</option>
          {stations.map((station, i) => (
            <option key={i} value={station}>
              {station}
            </option>
          ))}
        </select>
      </div>
          <Button />
    </>
  );
}

export default Card;
