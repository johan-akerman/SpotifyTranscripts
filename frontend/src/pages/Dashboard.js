import Color from "color-thief-react";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Search from "../components/Search";
import Jumbotron from "../components/Jumbotron";
import Overview from "../components/Overview";
import Description from "../components/Description";
import Chapters from "../components/Chapters";
import Footer from "../components/Footer";
import Subtitles from "../components/Subtitles";

export default function Dashboard() {
  const OPEN_AI_KEY = process.env.REACT_APP_OPEN_AI_KEY;
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  let player = document.getElementById("Player");
  const intervalRef = useRef();
  const [transcript, setTranscript] = useState([]);

  const [time, setTime] = useState(0);
  const [fullScreenSubtitles, setFullScreenSubtitles] = useState(false);
  const [dominantColor, setDominantColor] = useState("");
  const [chapters, setChapters] = useState([]);
  const episode = location.state;

  async function callOpenAIAPI(input) {
    console.log("Calling Open AI...");

    try {
      await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPEN_AI_KEY,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are an assistant that is receiving podcast transcripts as input in JSON format and your job is to segment the episode and identify which largers topics that are being discussed during different parts of the episode based on given timestamps. Based on the identified topic, you should return a auto generated chapter title based on the topic discussed alongside a start- and endtime in ms for each identified chapter. You should only return a list of chapters in JSON format in the following style, [{title: the title of the identified and auto-generated chapter goes here, time: [startTime in ms goes here, endTime in ms goes here], active: false}]. For the last identified chapter in the list, the endtime should always be 60000ms",
            },
            { role: "user", content: JSON.stringify(input) },
          ],
          temperature: 0,
          max_tokens: 500,
        }),
      })
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(JSON.parse(data.choices[0].message.content));
          setChapters(JSON.parse(data.choices[0].message.content));
        });
    } catch (e) {
      console.log("error: ", e);
    }
  }

  useEffect(async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/get_podcast?url=${episode.audio_preview_url}`,
        {
          method: "GET",
        }
      );

      let tmpResult = [];

      if (response.ok) {
        console.log("Successfully received transcript from backend...");
        const inputString = await response.text();
        let segments = inputString.split(". ");
        segments.pop();

        segments.forEach((segment) => {
          let tmpArray = segment.split(";");

          let obj = {
            startTime: tmpArray[0].substring(tmpArray[0].indexOf(" ") + 1),
            endTime: tmpArray[1].substring(tmpArray[1].indexOf(" ") + 1),
            sentence: tmpArray[2].substring(tmpArray[2].indexOf(" ") + 1),
          };

          tmpResult.push(obj);
        });
      }

      if (tmpResult.length > 0) {
        setTranscript(tmpResult);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  useEffect(() => {
    if (transcript.length > 1) {
      callOpenAIAPI(transcript);
    }
  }, [transcript]);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      updateTime(player.currentTime);
    }, [1000]);
  };

  function generateTimestamp(time_in_s) {
    var h = Math.floor(time_in_s / 3600);
    var m = Math.floor((time_in_s % 3600) / 60);
    var s = Math.floor((time_in_s % 3600) % 60);

    var hDisplay = "";
    var mDisplay = "";
    var sDisplay = "";

    if (h > 0) {
      hDisplay = h + ":";
    }

    mDisplay = m + ":";

    if (s >= 0) {
      if (s > 9) {
        sDisplay = s;
      } else {
        sDisplay = "0" + s;
      }
    }

    return hDisplay + mDisplay + sDisplay;
  }

  useEffect(() => {
    if (episode) {
      let tmp = [...chapters];

      tmp?.forEach((chapter, i) => {
        if (
          time >= parseFloat(chapter.time[0] / 1000) &&
          time < parseFloat(chapter.time[1] / 1000)
        ) {
          tmp[i].active = true;
        } else {
          tmp[i].active = false;
        }
      });

      setChapters(tmp);
    }

    if (time) {
      let player = document.getElementById("Player");
      player.currentTime = time;
    }
  }, [time]);

  function updateTime(newTime) {
    if (newTime < 0) {
      setTime(0);
    } else if (newTime > episode.duration_ms / 1000) {
      setTime(episode.duration_ms / 1000);
    } else {
      setTime(newTime);
    }
  }

  function handleUpdateTime(value) {
    setTime(value);
  }

  function handleToggleSearch(value) {
    setShowSearch(!value);
  }

  function handleToggleTranscriptFullscreen(value) {
    setFullScreenSubtitles(!value);
  }

  function handleTogglePlay(value) {
    if (value) {
      player.pause();
      clearInterval(intervalRef.current);
    } else {
      startTimer();
      player.play();
    }

    setPlaying(!value);
  }

  if (transcript.length === 0 || chapters.length === 0) {
    return (
      <div className="bg-spotifyDarkGray h-screen pt-64">
        <div class="text-center">
          <div role="status">
            <svg
              aria-hidden="true"
              class="inline w-14 mb-4 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-spotifyLightGreen"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <h1 className="text-2xl text-white text-center font-semibold">
          Transcribing your podcast. Hang tight...
        </h1>
      </div>
    );
  }

  return (
    <>
      <Color src={episode.images[0].url} crossOrigin="anonymous" format="hex">
        {({ data }) => {
          setDominantColor(data);
        }}
      </Color>

      <div className="bg-black h-screen overflow-y-hidden ">
        <div className="grid grid-cols-12 gap-3 p-4">
          {fullScreenSubtitles ? (
            <div
              style={{
                backgroundColor: dominantColor,
              }}
              className={`pb-24 h-screen rounded-lg ${
                showSearch ? "col-span-9" : "col-span-12"
              }`}
            >
              <Subtitles
                time={time}
                transcript={transcript}
                fullScreenSubtitles={fullScreenSubtitles}
                handleToggleTranscriptFullscreen={
                  handleToggleTranscriptFullscreen
                }
                dominantColor={dominantColor}
              />
            </div>
          ) : (
            <div
              className={`bg-spotifyDarkGray pb-40  h-screen overflow-auto rounded-lg ${
                showSearch ? "col-span-9" : "col-span-12"
              }`}
            >
              <Jumbotron
                episode={episode}
                dominantColor={dominantColor}
                handleToggleSearch={handleToggleSearch}
                showSearch={showSearch}
              />

              <div className="text-white mx-6 mt-4">
                <Overview
                  playing={playing}
                  handleTogglePlay={handleTogglePlay}
                  episode={episode}
                  time={time}
                />

                <Description episode={episode} />

                <div className="w-full rounded  mt-12">
                  <Chapters
                    chapters={chapters}
                    time={time}
                    handleUpdateTime={handleUpdateTime}
                    generateTimestamp={generateTimestamp}
                  />

                  <Subtitles
                    time={time}
                    transcript={transcript}
                    fullScreenSubtitles={fullScreenSubtitles}
                    handleToggleTranscriptFullscreen={
                      handleToggleTranscriptFullscreen
                    }
                    dominantColor={dominantColor}
                  />
                </div>
              </div>
            </div>
          )}

          <Search
            transcript={transcript}
            handleUpdateTime={handleUpdateTime}
            showSearch={showSearch}
            handleToggleSearch={handleToggleSearch}
            generateTimestamp={generateTimestamp}
          />

          <Footer
            episode={episode}
            chapters={chapters}
            handleUpdateTime={handleUpdateTime}
            time={time}
            playing={playing}
            handleTogglePlay={handleTogglePlay}
            generateTimestamp={generateTimestamp}
          />
        </div>
      </div>
    </>
  );
}
