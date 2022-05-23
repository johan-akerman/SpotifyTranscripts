import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState("");
  return (
    <div className="w-full bg-yellow-500 left-0 right-0 fixed z-10 pb-4">
      <div className="w-10/12 mx-auto flex items-center justify-center h-20">
        <div className="w-1/2 relative text-yellow-800 focus-within:text-gray-900">
          <span className="absolute inset-y-0 left-6 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="text"
            className="w-full pl-16 pr-6 py-3 font-semibold rounded-full text-lg placeholder-yellow-600 bg-yellow-400 focus:outline-none focus:bg-white focus:placeholder-gray-900 focus:text-gray-900"
            placeholder="Search transcript"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <Link to="/discover">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="mr-2 text-4xl text-white fixed top-4 right-10"
          />
        </Link>
      </div>
    </div>
  );
}
