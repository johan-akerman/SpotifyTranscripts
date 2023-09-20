import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Search({
  transcript,
  showSearch,
  handleToggleSearch,
  handleUpdateTime,
  generateTimestamp,
}) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  function search(word) {
    let tmp = [];
    transcript.map((row) => {
      let index = row.sentence.toLowerCase().search(word);

      if (index === -1) {
        return;
      }

      let obj = {
        head: row.sentence.substring(0, index),
        word: word,
        tail: row.sentence.substring(index + word.length, row.sentence.length),
        startTime: row.startTime,
        endTime: row.endTime,
      };

      tmp.push(obj);
      setResult(tmp);
    });
  }

  useEffect(() => {
    let tmp = [];
    transcript.map((row) => {
      let obj = {
        head: row.sentence,
        word: null,
        tail: null,
        startTime: row.startTime,
        endTime: row.endTime,
      };

      tmp.push(obj);

      setResult(tmp);
    });
  }, [transcript]);

  return (
    <div
      className={`bg-spotifyDarkGray text-white h-screen overflow-auto pb-32 rounded-lg p-4 ${
        showSearch ? "col-span-3" : "col-span-0"
      }`}
    >
      <div className="h-18 flex justify-between relative">
        <h1 className="text-white text-xl">Transcript</h1>

        <div
          className="h-8 w-8 hover:bg-black  rounded-full text-center cursor-pointer"
          onClick={() => handleToggleSearch(showSearch)}
        >
          <FontAwesomeIcon
            icon={faTimes}
            className="text-xl text-white pt-1.5"
          />
        </div>
      </div>

      <div className="mt-4 relative">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute inset-y-0 left-4 top-3 pr-2 text-lg"
        />

        <input
          placeholder="Search in podcast"
          className="w-full rounded-full py-3
        bg-white bg-opacity-10 pl-12 pr-5 text-md leading-5 text-white
        outline-none"
          displayValue={(person) => person.name}
          autoComplete="off"
          onChange={(event) => search(event.target.value)}
        />
      </div>

      <div>
        {result.length === 0 && query !== "" ? (
          <div className="relative cursor-default select-none py-3 px-5 text-gray-700 text-lg">
            No results found
          </div>
        ) : (
          result.map((row, id) => (
            <div
              key={id}
              className="my-4 h-auto hover:bg-white hover:bg-opacity-10 rounded-lg p-2 select-none cursor-pointer"
              onClick={() => handleUpdateTime(row.startTime)}
            >
              <div className="text-xs font-semibold opacity-30">
                {generateTimestamp(Math.floor(row.startTime))} -{" "}
                {generateTimestamp(Math.floor(row.endTime))}
              </div>
              <div className="text-md">
                <span className="opacity-60">{row.head}</span>
                <span className="font-bold">{row.word}</span>
                <span className="opacity-60">{row.tail}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
