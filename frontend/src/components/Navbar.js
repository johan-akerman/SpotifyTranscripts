import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-7xl mx-auto relative flex items-center justify-between h-28">
      <Link to="/">
        <h1 className="text-white text-4xl font-semibold">Spotify</h1>
      </Link>

      <input
        className="w-1/2 p-3 rounded-full focus:ring-primary focus:border-primary text-lg placeholder-gray-100 text-white font-semibold bg-yellow-400"
        type="text"
        placeholder="Search transcript"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <Link to="/">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="mr-2 text-3xl text-white"
        />
      </Link>
    </div>
  );
}
