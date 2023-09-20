import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "react-tooltip";
import {
  faChevronLeft,
  faFileLines,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Jumbotron({
  episode,
  dominantColor,
  handleToggleSearch,
  showSearch,
}) {
  if (episode) {
    return (
      <div
        style={{
          backgroundImage: `linear-gradient(${dominantColor}, #121212)`,
        }}
        className={`h-96 w-full relative px-6`}
      >
        <div className="flex justify-between pt-4">
          <Link to="/discover">
            <div className="h-8 w-8 bg-black bg-opacity-30 rounded-full text-center ">
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-lg text-white  pt-2"
              />
            </div>
          </Link>
          <div
            id="searchIcon"
            className="h-8 w-8 bg-black bg-opacity-30 rounded-full text-center cursor-pointer "
            onClick={() => handleToggleSearch(showSearch)}
          >
            <FontAwesomeIcon
              icon={faFileLines}
              className="text-md text-white  pt-2"
            />
          </div>

          <Tooltip anchorSelect="#searchIcon" content="Show transcript" />
        </div>

        <div className="absolute w-full bottom-16 pr-10 ">
          <div className="w-full h-52 gap-6 flex items-end ">
            <img
              className="w-52 shadow-2xl rounded-xl aspect-square"
              src={episode?.images[0].url}
            />
            <div className="text-white  ">
              <p className="text-sm  font-normal">Podcast episode</p>
              <h1 className="text-6xl mt-2 font-bold pr-4">{episode?.name}</h1>
              <p className="text-xl mt-2 font-semibold">
                {episode?.show?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
