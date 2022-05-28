import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import {
  faBackwardStep,
  faForwardStep,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer({ episode, updateTime, time }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  let player = document.getElementById("Player");
  const intervalRef = useRef();

  useEffect(() => {
    let player = document.getElementById("Player");
    player.currentTime = time;
    setProgress(player.currentTime);
  }, [time]);

  console.log("footer time: " + time);

  function togglePlay(playing) {
    if (playing) {
      player.pause();
      clearInterval(intervalRef.current);
    } else {
      startTimer();
      player.play();
    }

    setPlaying(!playing);
  }

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress(player.currentTime);
      updateTime(player.currentTime);
    }, [1000]);
  };

  return (
    <div className="w-full bg-spotifyOrangeDark absolute  z-10 bottom-0 text-center text-2xl mx-auto py-8">
      <audio id="Player" className="mb-16">
        <source
          src={episode.audio_preview_url}
          autoPlay={true}
          type="audio/mpeg"
        ></source>
      </audio>

      <div className="w-10/12 mx-auto">
        <div className="flex justify-between gap-3">
          <span className="text-lg text-yellow-100 -mt-2.5">
            {(Math.floor(time) < 10 ? "0:0" : "0:") + Math.floor(time)}
          </span>

          <input
            type="range"
            value={progress}
            step="1"
            min="0"
            max="30"
            className="w-full h-2 bg-yellow-600 appearance-none rounded accent-white"
            onChange={(e) => updateTime(e.target.value)}
          />

          <span className="text-lg text-yellow-100 -mt-2.5">0:30 </span>
        </div>

        <div className="mt-4">
          <FontAwesomeIcon
            icon={faBackwardStep}
            onClick={() => updateTime(time - 10)}
            className="mr-6 pb-2.5  text-3xl text-white"
          />

          <FontAwesomeIcon
            icon={playing ? faPauseCircle : faPlayCircle}
            onClick={() => togglePlay(playing)}
            className="text-6xl text-white"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={() => updateTime(time + 10)}
            className="ml-6 pb-2.5 text-3xl text-white"
          />
        </div>
      </div>
    </div>
  );
}
