import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../images/logo_black.png";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Search from "./Search";

export default function Navbar({ transcript, updateTime }) {
  return (
    <div className="w-full bg-spotifyOrangeDark left-0 right-0 fixed z-10 pb-4">
      <div className="w-10/12 mx-auto flex items-center justify-center h-20">
        <div className="flex fixed top-6 left-10">
          <img src={logo} className="w-32" />
          <h1 className="text-black font-normal text-2xl mt-1 ml-1">
            Transcripts
          </h1>
        </div>

        <Search transcript={transcript} updateTime={updateTime} />

        <Link to="/discover">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="mr-2 text-5xl text-black fixed top-4 right-10"
          />
        </Link>
      </div>
    </div>
  );
}
