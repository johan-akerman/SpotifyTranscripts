import { useEffect, useState } from "react";

export const Form = ({ onNewMovie }) => {
  const [url, setUrl] = useState("");
  const [rating, setRating] = useState(3);
  return (
    <>
      <input
        className="border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary text-center border-black border-2 text-lg font-semibold"
        type="text"
        placeholder="Episode url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        className="bg-green-500 text-white px-5 py-3 rounded-lg cursor-pointer text-center text-lg font-semibold"
        onClick={async () => {
          const podcast = { url };
          const response = await fetch("/transcript_podcast", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(podcast),
          });

          if (response.ok) {
            console.log("worked");
            onNewMovie(podcast);
          }
        }}
      >
        Submit
      </button>
    </>
  );
};
