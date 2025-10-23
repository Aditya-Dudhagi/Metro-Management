import React from "react";

function Navbar() {
  return (
    <>
      <div
        id="navbar"
        className="m-1 rounded-full bg-[#b3dfff] justify-between p-1 flex items-center w-[400px]"
      >
        <div
          id="item"
          className="p-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white "
        >
          Home
        </div>
        <div
          id="item"
          className="p-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white "
        >
          Booking
        </div>
        <div
          id="item"
          className="p-1.5 rounded-2xl cursor-pointer hover:bg-black hover:text-white "
        >
          About Us
        </div>
      </div>
    </>
  );
}

export default Navbar;
