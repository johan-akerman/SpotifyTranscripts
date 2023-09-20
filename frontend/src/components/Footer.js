import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import {
  faBackwardStep,
  faForwardStep,
  faPauseCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Footer({
  episode,
  chapters,
  handleUpdateTime,
  time,
  playing,
  generateTimestamp,
  handleTogglePlay,
}) {
  console.log(time);

  return (
    <div className="w-full bg-[#000] absolute  z-10 bottom-0 text-center text-2xl mx-auto pb-3 pt-4">
      <audio id="Player" className="mb-16">
        <source src={episode.audio_preview_url} type="audio/mpeg"></source>
      </audio>

      <div className="w-10/12 mx-auto">
        <div className="flex items-center justify-center mb-4">
          <FontAwesomeIcon
            icon={faBackwardStep}
            onClick={() => handleUpdateTime(time - 10)}
            className="mr-6 text-xl text-white"
          />

          <FontAwesomeIcon
            icon={playing ? faPauseCircle : faPlayCircle}
            onClick={() => handleTogglePlay(playing)}
            className="text-4xl text-white"
          />
          <FontAwesomeIcon
            icon={faForwardStep}
            onClick={() => handleUpdateTime(time + 10)}
            className="ml-6 text-xl text-white"
          />
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-sm text-white opacity-30 -mt-1.5 w-14">
            {generateTimestamp(time)}
          </span>

          <div className="h-2 w-full relative z-0 flex  text-sm">
            <div
              style={{
                width: `${(time / 60) * 100}%`,
              }}
              className="bg-white absolute h-2 flex"
            ></div>

            {chapters.map((chapter, i) => {
              const big_percentage =
                ((chapter.time[1] / 1000 - chapter.time[0] / 1000) / 60) * 100;

              let small_percentage =
                ((time - chapter.time[0] / 1000) / (chapter.time[1] / 1000)) *
                100;

              if (small_percentage <= 0) {
                small_percentage = 0;
              }

              if (small_percentage >= 100) {
                small_percentage = 100;
              }

              return (
                <>
                  <div
                    id={`tooltip-${i}`}
                    style={{ width: `${big_percentage}%` }}
                    className=" z-10 h-2 bg-white border-r-8 border-black last:border-r-0 bg-opacity-30  cursor-pointer"
                    onClick={() => handleUpdateTime(chapter.time[0] / 1000)}
                  ></div>
                  <Tooltip
                    anchorSelect={`#tooltip-${i}`}
                    content={chapter.title}
                  />
                </>
              );
            })}
          </div>

          <span className="text-sm text-white opacity-30 -mt-1.5 w-14">
            {generateTimestamp(60)}
          </span>
        </div>
      </div>
    </div>
  );
}
