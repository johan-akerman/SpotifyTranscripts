import demo from "../images/demo.mp4";

export default function Home() {
  const CLIENT_ID = process.env.REACT_APP_SPOTFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/discover";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="mx-auto grid grid-cols-5 gap-20 lg:w-10/12 w-12/12 pt-60">
      <div className="col-span-2 pt-16 ">
        <h1 className="text-5xl font-bold">Spotify Transcripts</h1>
        <p className="text-lg mt-4 mb-4">
          Your interface for podcast transcripts, powered by Spotify and Google
          Speech Recognition.
        </p>
        <p className="mb-12 text-gray-400 text-md">
          A project by{" "}
          <a
            href="https://www.linkedin.com/in/johan-akerman/"
            target="_blank"
            className="hover:underline"
          >
            Johan Åkerman
          </a>
          . View{" "}
          <a
            href="https://github.com/johan-akerman/SpotifyTranscripts"
            target="_blank"
            className="hover:underline"
          >
            source code
          </a>
          .
        </p>

        <a
          className="bg-spotifyLightGreen hover:bg-spotifyDarkGreen text-white px-6 py-2.5 rounded-full cursor-pointer text-center text-sm font-semibold uppercase tracking-wider"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Log in with Spotify
        </a>
      </div>

      <div className="rounded-full col-span-3">
        <video autoPlay muted className="rounded-lg shadow-2xl">
          <source src={demo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
