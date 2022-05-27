import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Description from "../components/Description";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";

export default function Episode(props) {
  const location = useLocation();
  const episode = location.state;
  console.log(episode);

  const [transcript, setTranscript] = useState("");
  const [transcriptAsString, setTranscriptAsString] = useState("");
  const [time, setTime] = useState(0);

  function updateTime(newTime) {
    if (newTime < 0) {
      setTime(0);
    } else if (newTime > 30) {
      setTime(30);
    } else {
      setTime(newTime);
    }

    console.log(time);
  }

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

        setTranscriptAsString(
          transcriptAsString +
            " " +
            tmpArray[2].substring(tmpArray[2].indexOf(" ") + 1)
        );
        setTranscript((transcript) => [...transcript, obj]);
      });
    }
  }, []);

  return (
    <main className="bg-spotifyOrangeDark h-screen overflow-scroll">
      {transcript.length === 0 ? (
        <div className="mt-64">
          <h1 className="text-center text-7xl mb-2 animate-bounce">🤖</h1>
          <h1 className="text-2xl text-white text-center font-semibold">
            Trascribing your podcast. Hang tight...
          </h1>
        </div>
      ) : (
        <>
          <Navbar
            transcript={transcript}
            transcriptAsString={transcriptAsString}
          />
          <Transcript time={time} transcript={transcript} />
          <Footer time={time} episode={episode} updateTime={updateTime} />
        </>
      )}
    </main>
  );
}
