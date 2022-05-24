import logo from "../images/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="w-full pb-4">
      <div className="w-10/12 mx-auto flex items-center justify-between h-20">
        <div className="flex">
          <img src={logo} className="w-32" />
          <h1 className="text-white font-light text-2xl mt-1 ml-2">
            Transcripts
          </h1>
        </div>
        <div className="text-white flex">
          <Link to="" className="px-5">
            About
          </Link>

          <Link to="" className="px-5">
            Send feedback
          </Link>

          <a
            className="px-5 hover:cursor-pointer"
            onClick={() => {
              window.localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  );
}
