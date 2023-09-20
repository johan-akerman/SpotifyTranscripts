import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Chapters({
  chapters,
  handleUpdateTime,
  generateTimestamp,
}) {
  const [chapterIndex, setChapterIndex] = useState(0);

  function handleUpdateChapter(value) {
    if (value < 0) {
      setChapterIndex(0);
      return;
    }

    if (value + 3 > chapters.length - 1) {
      return;
    }

    setChapterIndex(value);
  }

  if (chapters) {
    return (
      <>
        <div className="h-18 flex justify-between relative py-4 border-b border-white border-opacity-25">
          <h1 className="text-white text-2xl">Chapters</h1>

          <div className=" flex gap-3">
            <div
              className={`h-8 w-8 bg-white bg-opacity-20 rounded-full text-center  ${
                chapterIndex <= 0
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer"
              }`}
              onClick={() => handleUpdateChapter(chapterIndex - 1)}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-xl text-white pr-1 pt-1.5"
              />
            </div>
            <div
              className={`h-8 w-8 bg-white bg-opacity-20 rounded-full text-center  ${
                chapterIndex + 4 > chapters.length - 1
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer"
              }`}
              onClick={() => handleUpdateChapter(chapterIndex + 1)}
            >
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xl text-white pr-1 pt-1.5"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3  overflow-y-auto cursor-pointer mt-4 mb-24">
          {chapters.slice(chapterIndex, chapterIndex + 4).map((chapter, i) => {
            return (
              <div
                key={i}
                className={`${
                  chapter.active ? "bg-opacity-20" : "bg-opacity-10"
                } hover:bg-opacity-20 bg-white text-white p-4 rounded-lg relative`}
                onClick={() =>
                  handleUpdateTime(parseFloat(chapter.time[0] / 1000))
                }
              >
                <h1
                  className={`font-semibold text-md w-3/4 truncate ${
                    chapter.active ? "text-green-500" : "text-white"
                  }`}
                >
                  {chapter.title}
                </h1>
                <span className="text-sm opacity-50">
                  {generateTimestamp(parseFloat(chapter.time[0] / 1000))} -{" "}
                  {generateTimestamp(parseFloat(chapter.time[1] / 1000))}
                </span>

                {chapter.active ? (
                  <FontAwesomeIcon
                    icon={faVolumeHigh}
                    className="text-green-500 text-xl absolute right-4 top-8"
                  />
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
