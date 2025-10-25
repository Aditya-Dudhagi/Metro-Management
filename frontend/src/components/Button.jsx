import React from 'react'

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

export default Button