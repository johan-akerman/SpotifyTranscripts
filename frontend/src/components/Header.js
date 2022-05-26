import logo from "../images/logo.png";

export default function Header() {
  return (
    <div className="w-full pb-4">
      <div className="w-10/12 mx-auto flex items-center justify-between h-20">
        <div className="flex">
          <img src={logo} className="w-32" />
          <h1 className="text-white font-light text-2xl mt-1 ml-2">
            Transcripts
          </h1>
        </div>
        <div className="text-white flex text-lg">
          <a
            href="https://github.com/johan-akerman/SpotifyTranscripts"
            target="_blank"
            className="px-5 cursor-pointer"
          >
            About
          </a>

          <a
            className="px-5 hover:cursor-pointer"
            onClick={() => {
              window.localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Log out
          </a>
        </div>
      </div>
    </div>
  );
}
