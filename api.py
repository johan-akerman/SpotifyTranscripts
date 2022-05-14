import speech_recognition as sr 
import os 
from os import path
import requests
import json
import librosa
import pydub
from pydub import AudioSegment
from pydub.silence import split_on_silence

class chunk: 
    def __init__(self, startTime, endTime, sentence): 
        self.startTime = startTime 
        self.endTime = endTime
        self.sentence = sentence
    def __str__(self):
        return "startTime: " + str(self.startTime) + "s, endTime: " + str(self.endTime) + "s, sentence: " + self.sentence


transcript = [] 

r = sr.Recognizer()

def download_podcast(url):
    downloaded_obj = requests.get(url)
    with open("podcast.mp3", "wb") as file:
        file.write(downloaded_obj.content)
    AudioSegment.from_mp3("podcast.mp3").export("podcast.wav", format="wav") # converts mp3 to wav
    os.remove("podcast.mp3") # removes original mp3 file

def get_large_audio_transcription(path):
    startTime = 0.000
    sound = AudioSegment.from_wav(path)  
    chunks = split_on_silence(sound,
        min_silence_len = 500, 
        silence_thresh = sound.dBFS-14,
        keep_silence=500,
    )

    folder_name = "audio-chunks"

    if not os.path.isdir(folder_name):
        os.mkdir(folder_name)

    for i, audio_chunk in enumerate(chunks, start=1):
        chunk_filename = os.path.join(folder_name, f"chunk{i}.wav")
        audio_chunk.export(chunk_filename, format="wav")
        
        with sr.AudioFile(chunk_filename) as source:
            audio_listened = r.record(source)
            try:
                sentence = r.recognize_google(audio_listened)
            except sr.UnknownValueError as e:
                print("Error:", str(e))
            else:
                sentence = f"{sentence.capitalize()}. "
                duration =  librosa.get_duration(filename=chunk_filename)
                endTime = startTime + duration
                transcript.append(chunk(startTime, endTime, sentence))
                startTime += duration
             
download_podcast("https://p.scdn.co/mp3-preview/913eae7bbcb8939772664897e61575ea175cb287")
get_large_audio_transcription("podcast.wav")

for obj in transcript:
    print(obj)