export default function Sentence({ text, time, startTime, endTime }) {
  return (
    <h1
      className={`text-2xl mx-auto sm:mt-5 font-bold md:mt-5 mb-3 ${
        time > startTime ? "text-white" : "text-yellow-700"
      }`}
    >
      {text}
    </h1>
  );
}
