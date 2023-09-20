# 🎙️ Spotify Transcripts
Combines Google Speech Recognition and the Spotify API to transcribe your favourite Spotify podcast. The tool also allows you to search the transcript and fastforward to where that sentence is mentioned in the podcast.

⚠️ See demo below and make sure to unmute the video. 

https://user-images.githubusercontent.com/44551216/170843792-813e5671-adb2-4bf1-b1d7-789de7c0ae09.mp4

## 📖 Story behind the project
During the summer of 2020 I participated in Spotify's summer hackathon and developed [Spotify Topics](https://github.com/johan-akerman/SpotifyTopics), a tool that let's you fast forward to timestamps where certain topics are being discussed in a podcast episode. Since then, I have been thinking about how Spotify's podcast experience could be improved further by transcribing each episode. I scrolled through the Spotify Community and discovered [Subtitles for Podcasts](https://community.spotify.com/t5/Live-Ideas/Podcasts-Subtitles-for-Podcasts/idi-p/5200537), a great feature idea with an eye-catching 4000+ upvotes 👀 
	
## ⚙️ Technologies used
I wanted to get more into backend development and Python so instead of finding a plug-and-play web api for speech recognition, I decided to do some overengineering by building my own API. 

More specifically, my API makes a call to the Spotify API and downloads the requested podcast. In order to show the subtitles at the right time when playing the podcast, we need to get the start- and end time of each word or sentence. This turned out to be trickier than expected... 

To solve the problem, I divided the original audio file into multiple smaller ones. To eliminate the risk of cutting the audio file mid sentence, my API listens for a silence of 500ms below 14 decibels before cutting. By doing this, I was able to measure the duration of each smaller audio file and as a result, calculate a start- and endtime of each sentence. Each new smaller audio file is sent to the Google Speech Recognition API that converts speech to text. As a result, my API returns each transcribed sentence together with it's start- and endtime. 

The backend is connected to a frontend through Flask. The frontend is built in React and styled with Tailwind CSS.

## 🚀 How to run the program

### Backend
```
export FLASK_APP=backend
export FLASK_DEBUG=1
flask run
```

### Frontend
```
npm start
```


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
