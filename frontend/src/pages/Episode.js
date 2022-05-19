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
    <main className="bg-yellow-500 max-h-screen overflow-scroll">
      <Navbar />

      {transcript}

      <Transcript />
      <Footer />
    </main>
  );
}
