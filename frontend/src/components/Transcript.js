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
    <div className="w-10/12 mx-auto mt-40 pb-40">
      {currentTranscript.length == 0 ? (
        <div className="mt-32">
          <h1 className="text-center text-7xl mb-8">🤖 </h1>
          <h1 className="text-2xl text-white text-center font-semibold">
            Trascribing your podcast. Hang tight...
          </h1>
        </div>
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
