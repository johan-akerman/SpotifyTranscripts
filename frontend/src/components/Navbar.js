import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
  return (
    <div className="w-full bg-yellow-500 left-0 right-0 fixed z-10 pb-4">
      <div className="w-10/12 mx-auto flex items-center justify-center h-20">
        <Search />

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
