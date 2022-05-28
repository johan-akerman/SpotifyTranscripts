import { useEffect } from "react";

export default function Sentence({ text, time, startTime, endTime }) {
  const currentSentence = time >= startTime && time < endTime;

  useEffect(() => {
    if (currentSentence) {
      const element = document.getElementById(startTime);
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [time]);

  return (
    <h1
      id={startTime}
      className={`text-7xl mx-auto font-bold pt-32 -mt-20 ${
        time >= startTime ? "text-white" : "text-yellow-700"
      }`}
    >
      {text}
    </h1>
  );
}
