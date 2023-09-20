
<p align="center">
<img src="/misc/readme/Spotify_logo.png"
	title="1" width="150" />
</p>
<h1 align="center">
Spotify Transcripts
</h1>

<h4 align="center">
Improving Spotify’s podcast experience with AI. 
<h4>


https://github.com/johan-akerman/SpotifyTranscripts/assets/44551216/a1cd7e18-66f7-4084-a547-600d363bbe29

# ✨ Key features 
- **Transcripts:** Speech recognition to convert speech into text and a timestamp.
- **Search:** Search the transcript and jump to a particular part of a conversation.
- **Chapters:** Break down an episode into auto-generated chapters based on topics.
- **Subtitles:** Make podcasts accessible to people with hearing difficulties. 


# 📖 About the project
During the summer of 2020, I participated in Spotify’s summer hackathon and developed [Spotify Topics](https://github.com/johan-akerman/SpotifyTopics), a tool that lets you fast forward to timestamps where certain topics were being discussed. In 2022, I continued to experiment by building subtitles for podcasts based on a [feature idea](https://community.spotify.com/t5/Live-Ideas/Podcasts-Subtitles-for-Podcasts/idi-p/5200537) which received 4500+ upvotes on Spotify’s community forum. In 2023, in the midst of the ChatGPT hype, I got inspired to combine my two previous projects into one podcast player and improve it by utilizing Open AI’s APIs. 

# ⚙️ Technologies used
The technologies used in this project can be found in the table below. 



Technology | Use case
| :--- | :--- 
React  | Frontend framework
Tailwind  | CSS styling library
Python  | Backend to handle transcription logic
Flask  | Connects python backend with react frontend
Spotify API  | To get information about podcast episodes
Google Speech Recognition API  | Converts speech to text, i.e transcribes the podcast
Open AI's GPT 3.5 API  | Segment transcript into chapters based on transcript

I wanted to learn how to connect a React frontend to a Python backend so I used this project as a learning opportunity to do that. As a result, I did some overengineering by building my own API to handle transcriptions on a Python backend instead of calling a plug-and-play API in the frontend. 

More specifically, the frontend makes a call to the Spotify API and gets the URL of the requested podcast. The URL is sent as a request to the backend that downloads the podcast as an mp3 in order to process it. 

The reason that the mp3 needs to be processed is that I need to get timestamps for each sentence in order to display them at the correct time in the subtitles. I identify sentences in the transcript by listening for a silence (< 14 decibels) longer than 500 ms. When a silence is identified, I split the original audio file to create a set of smaller audio files, one for each sentence. By doing this, I was able to calculate the start and end time of each sentence by looking at the length of each smaller audio file, see figure below. 

<p align="center">
<img src="/misc/readme/sentence_visualization.png"
	title="1" width="500" /> 
	
</p>

 All of the audio files are now sent to Google’s speech recognition API and returns a string of the transcribed audio. The transcription is now being sent back to the frontend who makes a request to Open AI’s API to segment the transcript and identify potential topics to divide the episode into different chapters. 


# 🚫 Limitations
Spotify’s API does not allow you to download full podcast episodes, only 30 second previews. This makes the app very limited to use and it is therefore only a proof of concept. 

# 🚀 Getting started

## Step 1: Sign up for API keys
- [Spotify](https://developer.spotify.com/)
- [Open AI](https://platform.openai.com/)

## Step 2: Add API keys to .env file
Create a .env file in the root directory and add your API keys:

```
REACT_APP_SPOTFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID_GOES_HERE
REACT_APP_OPEN_AI_KEY=YOUR_OPEN_AI_KEY_GOES_HERE
```

## Step 3: Run the project
Use the following commands to run the project. Start the frontend in one terminal and the backend in another terminal.


### Backend
```
export FLASK_APP=backend
export FLASK_DEBUG=1
flask run
```

### Frontend
```
cd frontend
npm start
```


# 📸 Screenshots
<p align="center">
<img src="/misc/readme/1.png"
	title="1" width="800" /> 
	<p align="center">Home page with Spotify authentication
</p>
<br />
</p>

  <p align="center">
<img src="/misc/readme/2.png"
	title="2" width="800" /> 
	
 <p align="center">Discovery page
</p>
<br />

 </p>
 <p align="center">
<img src="/misc/readme/3.png"
	title="3" width="800" /> 
 <p align="center">Loading screen
</p>
<br />

</p>
<p align="center">
<img src="/misc/readme/4.png"
	title="4" width="800" /> 
	<p align="center">Episode screen
</p>
<br />
</p>
<p align="center">
<img src="/misc/readme/5.png"
	title="5" width="800" />
	<p align="center">Episode screen
</p>
<br />
</p>

<p align="center">
 <img src="/misc/readme/6.png"
	title="6" width="800" /> 
 <p align="center">Subtitles in fullscreen
</p>
<br />
</p>

<p align="center">
 <img src="/misc/readme/7.png"
	title="7" width="800" /> 
	<p align="center">Overview of chapters within an episode
</p>
<br />
</p>

<p align="center">
 <img src="/misc/readme/8.png"
	title="8" width="800" /> 
	<p align="center">Audio player divided by chapters
</p>
<br />
</p>


<p align="center">
 <img src="/misc/readme/9.png"
	title="9" width="300" /> 
	<p align="center">Search transcript
</p>
</p>
