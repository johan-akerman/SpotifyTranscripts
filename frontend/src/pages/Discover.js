import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Discover() {
  //   const [searchKey, setSearchKey] = useState("3h8EqupPbGuOiU405ryod3");
  const [searchKey, setSearchKey] = useState("");
  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);
  const CLIENT_ID = "b548c518c6c547dc9d57995287a966f6";
  const REDIRECT_URI = "http://localhost:3000/discover";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();

    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });

    setArtists(data.artists.items);
  };

  const renderArtists = () => {
    return artists.map((artist) => <div key={artist.id}>{artist.name}</div>);
  };

  return (
    <>
      <main className="bg-black h-screen">
        <Header />
        <div className="text-white text-lg">
          {!token ? (
            <a
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
            >
              Login to Spotify
            </a>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>

        <div className="text-center lg:w-10/12 w-12/12 pt-60 pb-52 mx-auto">
          <h1 className="text-white text-5xl text-semibold tracking-wider mb-12">
            Seach for a podcast episode
          </h1>
          <p className="text-white text-md mb-4">{"token: " + token}</p>
          <form onSubmit={searchArtists} className="mb-8">
            <input
              className="w-96 border-grey-light p-3 rounded-lg focus:ring-primary focus:border-primary border-black border-2 text-lg font-semibold mr-3"
              type="text"
              placeholder="Search  . . ."
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className="bg-green-500 text-white px-5 rounded-lg py-3 cursor-pointer text-center text-lg font-semibold"
              type={"submit"}
            >
              Search
            </button>
          </form>

          <Link to="/episode" className="text-green-500">
            Temp link to /episode
          </Link>
        </div>

        <div className="text-white text-md">{renderArtists()}</div>
      </main>
    </>
  );
}
