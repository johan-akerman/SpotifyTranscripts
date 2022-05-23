import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  faBackwardStep,
  faForwardStep,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer({ podcast }) {
  const [audioUrl, setAudioUrl] = useState([]);

  return (
    <div className="w-full bg-yellow-500 absolute h-36 z-10 bottom-0 text-center text-2xl mx-auto py-8">
      <div className="w-10/12 mx-auto">
        <div className="flex justify-between gap-3">
          <span className="text-lg text-yellow-100 -mt-3">0:00</span>
          <div className="w-full bg-yellow-400 h-1 rounded-full">
            <div className="bg-white h-1" style={{ width: "45%" }}></div>
          </div>
          <span className="text-lg text-yellow-100 -mt-3">42:00</span>
        </div>

        <div className="mt-4">
          <FontAwesomeIcon
            icon={faBackwardStep}
            className="mr-6 pb-2.5  text-3xl text-white"
          />

          <FontAwesomeIcon
            icon={faPlayCircle}
            className="text-6xl text-white"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            className="ml-6 pb-2.5 text-3xl text-white"
          />
        </div>
      </div>
    </div>
  );
}
