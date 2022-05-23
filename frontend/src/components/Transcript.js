import Sentence from "./Sentence";
import { useEffect, useState } from "react";

export default function Transcript({ time, transcript }) {
  const [currentTime, setCurrentTime] = useState(time);
  const [currentTranscript, setCurrentTranscript] = useState([]);

  useEffect(() => {
    setCurrentTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    setCurrentTime(time);
  }, [time]);

  return (
    <div className="w-10/12 mx-auto pt-28">
      {currentTranscript.length == 0 ? (
        <h1 className="text-3xl text-white text-center font-semibold mt-32">
          🤖 Trascribing your podcast...
        </h1>
      ) : (
        currentTranscript.map((obj) => {
          return (
            <Sentence
              key={parseFloat(obj.startTime)}
              startTime={parseFloat(obj.startTime)}
              endTime={parseFloat(obj.endTime)}
              text={obj.sentence}
              time={currentTime}
            />
          );
        })
      )}
    </div>
  );
}
