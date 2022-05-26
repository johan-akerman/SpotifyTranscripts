import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
];

export default function Search({ transcript, transcriptAsString }) {
  const [selected, setSelected] = useState("");
  const [query, setQuery] = useState("");

  console.log(transcriptAsString);

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-1/2 relative text-yellow-800 focus-within:text-gray-900">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Combobox.Button className="absolute inset-y-0 left-4 flex items-center pr-2">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </Combobox.Button>

          <Combobox.Input
            placeholder="Search transcript"
            className="focus:border-2 border-black w-full rounded-xl py-4 bg-yellow-400 pl-12 pr-5 text-lg leading-5 text-yellow-800 placeholder-yellow-800 focus:placeholder-black focus:text-black focus:bg-white outline-none"
            displayValue={(person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 ring-1 border-2 border-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-3 px-5 text-gray-700 text-lg">
                  Nothing found 😔
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-5 text-lg ${
                        active ? "bg-gray-100" : ""
                      }`
                    }
                    value={person}
                  >
                    <div className="grid grid-cols-5 gap-2">
                      <div className="col-span-4 overflow-ellipsis overflow-hidden whitespace-nowrap">
                        <span className="font-bold">{person.name}</span>{" "}
                        <span className="opacity-50">
                          hej jag heter asdfasdfasdfasdfasdf asdf asdfa dsfa sdf
                          asdf
                        </span>
                      </div>
                      <div className="col-span-1 text-right">0:00 - 0:13</div>
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
