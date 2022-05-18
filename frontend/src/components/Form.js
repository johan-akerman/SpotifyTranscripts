import { useEffect, useState } from "react";

export const Form = ({ onNewMovie }) => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(3);
  return (
    <>
      <input
        className="border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary text-center border-black border-2 text-lg font-semibold"
        type="text"
        placeholder="Episode ID"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {title}
      {rating}

      <button
        className="bg-green-500 text-white px-5 py-3 rounded-lg cursor-pointer text-center text-lg font-semibold"
        onClick={async () => {
          const movie = { title, rating };
          const response = await fetch("/add_movie", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(movie),
          });

          if (response.ok) {
            console.log("worked");
            onNewMovie(movie);
            setTitle("");
          }
        }}
      >
        Submit
      </button>
    </>
  );
};
