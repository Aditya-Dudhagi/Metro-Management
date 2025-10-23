import React from "react";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Button from "./components/Button";
// run the following command to start the tailwind
// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

function App() {

  return (
    <>
      <div
        id="container"
        className="bg-[#4169E1]  h-screen block justify-center font-sans"
      >
        <div
          id="nav-container"
          className="bg-white p-2 w-full border flex justify-center items-start"
        >
          <Navbar />
        </div>
        <div id="body-container" className="p-2 border-2">
          
          <Card />
        </div>
      </div>
    </>
  );
}

export default App;
