# 🎙️ Spotify Transcripts
Combines Google speech recognition and the Spotify API to transcribe your favourite Spotify podcast and generate searchable subtitles.

https://user-images.githubusercontent.com/44551216/170843792-813e5671-adb2-4bf1-b1d7-789de7c0ae09.mp4

## 📖 Story behind the project
During the summer of 2020 I participated in Spotify's summer hackathon and developed [Spotify Topics](https://github.com/johan-akerman/SpotifyTopics) , a tool that let's you fast forward to timestamps where certain topics are being discussed in a podcast episode. Since then, I have been thinking about how Spotify's podcast experience could be improved further by transcribing each episode. I scrolled through the Spotify Community and discovered [Subtitles for Podcasts](https://community.spotify.com/t5/Live-Ideas/Podcasts-Subtitles-for-Podcasts/idi-p/5200537), a great feature idea with an eye-catching 4290 upvotes 👀 

<img src="/misc/readme/6.png" 
	title="Gif" width="800" />
	
## ⚙️ Technologies used
I have been interested in getting more into backend development and python so instead of finding a plug and play web api for speech recognition, I decided to do some overengineering by building my own REST API. 

More specifically, the REST API downloads a podcast in mp3 format and converts it into wov format. The audio file is divided into sentences (multiple smaller audio files) by listening for a silence that indicates the end of a sentence (500 ms of noice below 14 decibels). Each new smaller audio file is sent into the Google Speech Recognition API and my API returns each transcribed sentence together with it's start- and endtime. 

The backend is connected to a frontend through Flask. The frontend is built in React and styled with Tailwind CSS. The data for each Podcast episode is fetched with the Spotify Web API.

## 📸 Screenshots
<img src="/misc/readme/1.png"
	title="1" width="800" /> 
	<br />
		
<img src="/misc/readme/2.png"
	title="2" width="800" /> 
	<br />
	
<img src="/misc/readme/3.png"
	title="3" width="800" /> 
	<br />

<img src="/misc/readme/4.png"
	title="4" width="800" /> 
	<br />
	
<img src="/misc/readme/5.png"
	title="5" width="800" /> 
	<br />
