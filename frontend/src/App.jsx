import React, { useState } from 'react';

// Button Component
function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      Book Ticket
    </button>
  );
}

// Card Component
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
    
    if (source !== null && destination !== null && source !== destination) {
      // Simulating API call
      const fare = Math.abs(source - destination) * 10;
      alert(`Ticket booked successfully! Fare: ₹${fare}`);
      setDestination(null);
      setSource(null);
    } else {
      alert("Please select valid source and destination");
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

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg p-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
              Pune Metro
            </span>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-full p-1">
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium transition-all duration-300">
              Home
            </button>
            <button className="px-6 py-2 rounded-full hover:bg-white text-gray-700 font-medium transition-all duration-300">
              Booking
            </button>
            <button className="px-6 py-2 rounded-full hover:bg-white text-gray-700 font-medium transition-all duration-300">
              About Us
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-purple-50 to-cyan-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Welcome to Pune Metro
          </h1>
          <p className="text-gray-600 text-lg">
            Fast, Safe, and Reliable Metro Service
          </p>
        </div>

        <div className="flex justify-center">
          <Card />
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Quick Transit</h3>
            <p className="text-gray-600 text-sm">Reach your destination faster</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Safe Journey</h3>
            <p className="text-gray-600 text-sm">Your safety is our priority</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="bg-cyan-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg mb-2">Affordable</h3>
            <p className="text-gray-600 text-sm">Budget-friendly fares</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;