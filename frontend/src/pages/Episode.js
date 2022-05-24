import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";

export default function Episode(props) {
  const location = useLocation();
  const episode = location.state;
  console.log(episode);

  const [transcript, setTranscript] = useState([]);
  const [time, setTime] = useState(12.0);

  // let urlExample =
  //   "https://p.scdn.co/mp3-preview/9043b63e9636efb5842b349db06ead41e7580d22";

  useEffect(async () => {
    const response = await fetch(
      `http://127.0.0.1:5000/get_podcast?url=${episode.audio_preview_url}`,
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
  }, []);

  return (
    <main className="bg-yellow-500 h-screen overflow-scroll">
      <Navbar />
      <Transcript time={time} transcript={transcript} />
      <Footer time={time} />
    </main>
  );
}
