import { useState } from "react";

export default function Description({ episode }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (episode) {
    return (
      <div className="mt-12 w-full">
        <h1 className="text-white text-2xl">Description</h1>
        <p className="opacity-60 mt-3 w-4/5">
          {showFullDescription
            ? episode?.description
            : episode?.description.slice(0, 200) + "..."}
        </p>

        {!showFullDescription ? (
          <p
            className="text-md font-semibold mt-3 cursor-pointer"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            ... Read more
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}
