import { useEffect } from "react";

export default function Sentence({ text, time, startTime, endTime }) {
  const currentSentence = time > startTime && time < endTime;

  useEffect(() => {
    if (currentSentence) {
      const element = document.getElementById(startTime);
      const y = element.getBoundingClientRect().top + window.scrollY;
    }
  }, [time]);

  return (
    <h1
      id={startTime}
      className={`text-7xl mx-auto sm:mt-5 font-bold md:mt-5 mb-16 ${
        time >= startTime ? "text-white" : "text-yellow-700"
      }`}
    >
      {text}
    </h1>
  );
}
