import { useEffect, useState } from "react";
import Description from "../components/Description";
import Footer from "../components/Footer";
import { Form } from "../components/Form";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";

export default function Episode() {
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    // fetch("/podcasts").then((response) =>
    //   response.json().then((data) => {
    //     setMovies(data.podcasts);
    //   })
    // );
  }, []);

  return (
    <main className="bg-yellow-500 h-screen">
      <Navbar />
      <div className="w-9/12 mx-auto">
        <Form onNewTranscript={(transcript) => setTranscript(transcript)} />

        <ul className="text-xl mt-20">
          {/* {movies?.map((podcast, id) => {
            return <li key={id}>{podcast.url}</li>;
          })} */}
        </ul>
      </div>
      {transcript}
      {/* {/* <Description /> */}
      <Transcript />
      <Footer />
    </main>
  );
}
