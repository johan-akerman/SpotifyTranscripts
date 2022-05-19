import { useEffect, useState } from "react";

export const Form = ({ onNewTranscript }) => {
  const [url, setUrl] = useState("");
  return (
    <div className="gap-3 flex">
      <input
        className="w-96 border-grey-light p-3 rounded focus:ring-primary focus:border-primary border-black border-2 text-lg font-semibold"
        type="text"
        placeholder="Episode URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-5 rounded-lg cursor-pointer text-center text-lg font-semibold"
        onClick={async () => {
          const response = await fetch(
            `http://127.0.0.1:5000/get_podcast?url=${url}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            onNewTranscript(await response.text());
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};
