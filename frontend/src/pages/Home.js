import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <>
      <main className="bg-black h-screen">
        <div className="text-center lg:w-10/12 w-12/12 pt-60 pb-52 mx-auto ">
          <h1 className="font-grotesk text-white text-6xl mx-auto sm:mt-5 font-bold md:mt-5 px-5 text-center">
            Spotify Transcribe
          </h1>

          <div className="mt-16 bg-white rounded-lg p-4 md:w-3/12 w-11/12 mx-auto">
            <input
              className="border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary text-center border-black border-2 text-lg font-semibold"
              type="text"
              placeholder="Episode ID"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Link to="/episode">
              <div className="bg-green-500 text-white px-5 py-3 rounded-lg cursor-pointer text-center text-lg font-semibold">
                Enter
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
