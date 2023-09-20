import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons";

export default function Overview({ episode, time, playing, handleTogglePlay }) {
  return (
    <div className="flex mt-6 items-center gap-8">
      <FontAwesomeIcon
        icon={playing ? faPauseCircle : faPlayCircle}
        onClick={() => handleTogglePlay(playing)}
        className="text-6xl text-green-500 cursor-pointer"
      />

      <div className="text-xs flex items-center gap-10">
        <span className="opacity-30">{episode?.release_date}.</span>
        <span className="opacity-30">
          {Math.floor(60 - time)} seconds remaining
        </span>
        <div className="h-1 rounded-full w-24 bg-gray-200 bg-opacity-50 relative z-0">
          <div
            style={{
              width: `${(time / 60) * 100}%`,
            }}
            className="h-1 rounded-full bg-white aboslute left-0 top-0 z-10"
          ></div>
        </div>
      </div>
    </div>
  );
}
