import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Search({ transcript, updateTime }) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);

  function search(word) {
    let tmp = [];
    transcript.map((row) => {
      let index = row.sentence.toLowerCase().indexOf(word);

      if (index === -1) {
        return;
      }

      let obj = {
        word: word,
        reminder: row.sentence.substring(index + word.length),
        startTime: row.startTime,
        endTime: row.endTime,
      };

      tmp.push(obj);

      setResult(tmp);
      console.log(result);
    });
  }

  return (
    <div className="relative text-white">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Combobox.Button className="absolute inset-y-0 left-4 flex items-center pr-2">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </Combobox.Button>

          <Combobox.Input
            placeholder="Search transcript"
            className="w-full rounded-full py-3 bg-white bg-opacity-10 pl-12 pr-5 text-md leading-5 text-white outline-none"
            displayValue={(person) => person.name}
            autoComplete="off"
            onChange={(event) => search(event.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 ring-1 border-2 border-black ring-opacity-5 focus:outline-none sm:text-sm">
              {result.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-3 px-5 text-gray-700 text-lg">
                  Nothing found 😔
                </div>
              ) : (
                result.map((row, id) => (
                  <Combobox.Option
                    key={id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-5 text-lg ${
                        active ? "bg-gray-100" : ""
                      }`
                    }
                    value={id}
                    onClick={() => updateTime(row.startTime)}
                  >
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                        <span className="font-bold">{row.word}</span>
                        <span className="opacity-50">{row.reminder}</span>
                      </div>
                      <div className="col-span-1 text-right">
                        0:
                        {(row.startTime < 10 ? "0" : null) +
                          Math.floor(row.startTime)}{" "}
                        - 0:
                        {(row.endTime < 10 ? "0" : null) +
                          Math.floor(row.endTime)}
                      </div>
                    </div>
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
