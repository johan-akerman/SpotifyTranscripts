import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [value, setValue] = useState("");
  return (
    <div className="w-11/12 mx-auto relative flex items-center justify-end h-20">
      {/* <Link to="/" className="flex justify-between">
        <h1 className="text-black text-3xl font-semibold">Spotify</h1>
        <h2 className="text-black font-light text-3xl pl-2">Transcriber</h2>
      </Link> */}

      {/* <input
        className="w-1/2 p-3 rounded-full focus:ring-primary focus:border-primary text-lg placeholder-gray-800 text-white font-semibold bg-yellow-400"
        type="text"
        placeholder="Search transcript"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      /> */}

      <Link to="/">
        <FontAwesomeIcon
          icon={faTimesCircle}
          className="mr-2 text-4xl text-white"
        />
      </Link>
    </div>
  );
}
