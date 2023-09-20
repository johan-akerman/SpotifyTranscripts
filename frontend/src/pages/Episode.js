import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/old/Footer";
import Navbar from "../components/old/Navbar";
import Transcript from "../components/old/Transcript";

export default function Episode(props) {
  const location = useLocation();
  const episode = location.state;

  const [transcript, setTranscript] = useState("");
  const [time, setTime] = useState(0);

  function updateTime(newTime) {
    if (newTime < 0) {
      setTime(0);
    } else if (newTime > 30) {
      setTime(30);
    } else {
      setTime(newTime);
    }

    console.log("updated time: " + time);
  }

  useEffect(async () => {
    console.log(episode.audio_preview_url);

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
    <main className="bg-spotifyDarkGray h-screen overflow-scroll">
      {transcript.length === 0 ? (
        <div className="mt-64">
          <h1 className="text-center text-7xl mb-2 animate-bounce">🤖</h1>
          <h1 className="text-2xl text-white text-center font-semibold">
            Transcribing your podcast. Hang tight...
          </h1>
        </div>
      ) : (
        <>
          {console.log(transcript)}
          <h1>Hej</h1>
          {/* <Navbar transcript={transcript} updateTime={updateTime} />
          <Transcript time={time} transcript={transcript} />
          <Footer time={time} episode={episode} updateTime={updateTime} /> */}
        </>
      )}
    </main>
  );
}
