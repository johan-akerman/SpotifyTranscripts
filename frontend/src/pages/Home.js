import overview from "../images/overview.png";

export default function Home() {
  const CLIENT_ID = process.env.REACT_APP_SPOTFY_CLIENT_ID;
  const REDIRECT_URI = "http://localhost:3000/discover";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  return (
    <div className="text-white bg-spotifyDarkGray h-screen">
      <div className="mx-auto grid grid-cols-5 gap-20 lg:w-10/12 w-12/12 pt-60 ">
        <div className="col-span-2 pt-16 ">
          <h1 className="text-5xl font-bold">Spotify Transcripts</h1>
          <p className="text-lg mt-4 mb-12">
            A proof of concept for an improved podcast experience powered by AI.
          </p>

          <a
            className="bg-spotifyLightGreen hover:bg-spotifyDarkGreen text-spotifyDarkGray px-6 py-4 rounded-full cursor-pointer text-center text-sm font-semibold uppercase tracking-wider"
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Log in with Spotify
          </a>
        </div>

        <div className="col-span-3">
          <img
            src={overview}
            autoPlay
            muted
            className="rounded-lg shadow border-2 border-black"
          />
        </div>
      </div>
    </div>
  );
}
