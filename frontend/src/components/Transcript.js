import Sentence from "./Sentence";

export default function Transcript() {
  let time = 10;

  return (
    <div className="w-full overflow-y-scroll mt-4 h-96">
      <div className="w-10/12 mx-auto">
        <Sentence
          text="Hello and welcome to the podcast."
          time={time}
          startTime={0.0}
          endTime={9.0}
        />
        <Sentence
          text="Today we will talk about american history."
          time={time}
          startTime={9.1}
          endTime={21.0}
        />
        <Sentence
          text="With me, I have Barack Obama."
          time={time}
          startTime={21.1}
          endTime={30}
        />

        <Sentence
          text="With me, I have Barack Obama."
          time={time}
          startTime={21.1}
          endTime={30}
        />

        <Sentence
          text="With me, I have Barack Obama."
          time={time}
          startTime={21.1}
          endTime={30}
        />

        <Sentence
          text="With me, I have Barack Obama."
          time={time}
          startTime={21.1}
          endTime={30}
        />

        <Sentence
          text="With me, I have Barack Obama."
          time={time}
          startTime={21.1}
          endTime={30}
        />
      </div>
    </div>
  );
}
