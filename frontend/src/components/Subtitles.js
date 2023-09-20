import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sentence from "./Sentence";
import {
  faTimes,
  faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";

export default function Transcript({
  transcript,
  time,
  handleToggleTranscriptFullscreen,
  fullScreenSubtitles,
  dominantColor,
}) {
  function scrollIntoSentence(child) {
    const parent = document.getElementById("parentSubtitles");
    parent.scrollTo({
      top: child.offsetTop,
      behavior: "smooth",
    });
  }

  return (
    <div
      style={{
        backgroundColor: dominantColor,
      }}
      className={`w-full rounded-xl relative`}
    >
      <div
        style={{
          backgroundColor: dominantColor,
        }}
        className="h-18 flex flex-row justify-between absolute rounded-t-xl w-full p-6 top-0"
      >
        <h1 className="text-white text-2xl">Subtitles</h1>

        <div
          className="h-8 w-8 bg-black bg-opacity-60 rounded-full text-center cursor-pointer"
          onClick={() => handleToggleTranscriptFullscreen(fullScreenSubtitles)}
        >
          <FontAwesomeIcon
            icon={
              !fullScreenSubtitles ? faUpRightAndDownLeftFromCenter : faTimes
            }
            className="text-md text-white pt-2 pl-0.5 pr-0.5"
          />
        </div>
      </div>

      <div
        id="parentSubtitles"
        className={`px-6 pt-20 overflow-y-auto pb-12 ${
          fullScreenSubtitles ? "h-screen" : "h-96"
        }`}
      >
        {transcript.map((sentence, id) => {
          return (
            <Sentence
              key={id}
              scrollIntoSentence={scrollIntoSentence}
              startTime={parseFloat(sentence.startTime)}
              endTime={parseFloat(sentence.endTime)}
              text={sentence.sentence}
              time={time}
            />
          );
        })}
      </div>
    </div>
  );
}
