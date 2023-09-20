import { useEffect } from "react";

export default function Sentence({
  text,
  time,
  startTime,
  endTime,
  scrollIntoSentence,
}) {
  const currentSentence = time > startTime && time < endTime;

  useEffect(() => {
    if (currentSentence) {
      const element = document.getElementById(startTime);
      scrollIntoSentence(element);
    }
  }, [time]);

  return (
    <h1
      id={startTime}
      className={`text-6xl mx-auto font-bold pt-28 -mt-20 text-white ${
        time >= startTime ? "opacity-1" : "text-spotifyDarkGray"
      }`}
    >
      {text}
    </h1>
  );
}
