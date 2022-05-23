import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";
import axios from "axios";

export default function Episode() {
  const [transcript, setTranscript] = useState([]);
  const [time, setTime] = useState(12.0);
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [podcast, setPodcast] = useState({});

  const CLIENT_ID = "b548c518c6c547dc9d57995287a966f6";
  const REDIRECT_URI = "http://localhost:3000/episode";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  // 3h8EqupPbGuOiU405ryod3

  const searchPodcast = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://api.spotify.com/v1/episodes/${searchKey}?market=SE`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(data);
    setPodcast(data);
  };

  useEffect(async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/get_podcast?url=${podcast.audio_preview_url}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const inputString = await response.text();
      const tmp = inputString.split(". ");

      tmp.forEach((segment) => {
        let tmpArray = segment.split(";");
        let obj = {
          startTime: tmpArray[0].substring(tmpArray[0].indexOf(" ") + 1),
          endTime: tmpArray[1].substring(tmpArray[1].indexOf(" ") + 1),
          sentence: tmpArray[2].substring(tmpArray[2].indexOf(" ") + 1),
        };

        setTranscript((transcript) => [...transcript, obj]);
      });
    }
  }, [podcast]);

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

  return (
    <main className="bg-yellow-500 h-screen overflow-scroll">
      <a
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
      >
        Login to Spotify
      </a>

      {"token:" + token}

      <form onSubmit={searchPodcast}>
        <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
        <button type={"submit"}>Search</button>
      </form>

      <Navbar />

      <Transcript time={time} transcript={transcript} />
      <Footer time={time} podcast={podcast} />
    </main>
  );
}
