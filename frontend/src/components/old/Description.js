export default function Description({ episode }) {
  console.log(episode);
  return (
    <div className="w-10/12 mx-auto flex mt-12 mb-16 relative">
      {episode ? (
        <>
          <img
            className="h-20 w-20 rounded-sm shadow-xl"
            src={episode?.images[0].url}
          />
          <div className="pt-5 pl-6">
            <h1 className="text-4xl text-white font-semibold">
              {episode?.name}
            </h1>
            <p className="text-sm text-white font-semibold">
              {episode?.show.name}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
