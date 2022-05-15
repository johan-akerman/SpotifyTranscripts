import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faFastBackward,
  faFastForward,
  faPlayCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  const [value, setValue] = useState("");
  return (
    <div className="mx-auto w-1/2 absolute left-0 right-0 h-40 bottom-0 text-center text-2xl">
      <div className="h-2 bg-yellow-100 rounded-full"></div>
      <div className="justify-between flex mt-2">
        <span>0:00</span>
        <span>42:00</span>
      </div>
      <div>
        <FontAwesomeIcon
          icon={faFastBackward}
          className="mr-3 pb-1.5  text-3xl text-white"
        />
        <FontAwesomeIcon icon={faPlayCircle} className="text-5xl text-white" />
        <FontAwesomeIcon
          icon={faFastForward}
          className="ml-3 pb-1.5 text-3xl text-white"
        />
      </div>
    </div>
  );
}
