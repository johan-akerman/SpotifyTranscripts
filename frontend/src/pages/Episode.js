import { useEffect, useState } from "react";
import Description from "../components/Description";
import Footer from "../components/Footer";
import { Form } from "../components/Form";
import Navbar from "../components/Navbar";
import Transcript from "../components/Transcript";

export default function Episode() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/podcasts").then((response) =>
      response.json().then((data) => {
        setMovies(data.podcasts);
      })
    );
  }, []);

  return (
    <main className="bg-yellow-500 h-screen">
      <Navbar />
      <div>
        <ul className="text-5xl">
          {movies?.map((podcast, id) => {
            return <li key={id}>{podcast.transcript}</li>;
          })}
        </ul>
      </div>
      <Form
        onNewMobie={(movie) =>
          setMovies((currentMovies) => [movie, ...currentMovies])
        }
      />
      {/* <Description />
      <Transcript /> */}
      <Footer />
    </main>
  );
}
