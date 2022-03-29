import React, {useState, useRef} from "react";
//Import Styles
import "./styles/app.scss";
//Adding Components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//Import Util
import data from "./data";

function App() {
  //States
 const [songs, setSongs] = useState(data());
 const [currentSong, setCurrentSong] = useState(songs[0]); //first song as default
 const [isPlaying, setIsPlaying] = useState(false);
 const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false); //closed
 
 //Ref
  const audioRef = useRef(null);

 //Events
 const timeUpdateHandler = (e) => {
  //with the event onTimeUpdate we can access to the current time and duration of the song
  //we need to update every second that the song is playing
  const current = e.target.currentTime;
  const duration = e.target.duration;
  setSongInfo({...songInfo, currentTime: current, duration: duration}); //we need to update the state every time the song is playing
}

 
 return (
    <div className="App">
      <Nav 
        libraryStatus ={libraryStatus} 
        setLibraryStatus = {setLibraryStatus}
      />
      <Song currentSong = {currentSong}/>
      <Player 
        currentSong = {currentSong}
        isPlaying = {isPlaying} 
        setIsPlaying = {setIsPlaying} 
        audioRef = {audioRef}
        songInfo = {songInfo}
        setSongInfo = {setSongInfo}
        songs = {songs}
        setCurrentSong = {setCurrentSong}
        setSongs = {setSongs}
      />
      <Library 
        songs = {songs} 
        setCurrentSong = {setCurrentSong}
        audioRef = {audioRef}
        isPlaying = {isPlaying}
        setSongs = {setSongs}
        libraryStatus ={libraryStatus}
      />
        <audio 
           onTimeUpdate = {timeUpdateHandler}  //Runs every time the time changes in the audio and we can access to the current time and duration by this property
           onLoadedMetadata = {timeUpdateHandler} //To set the information of the song (end time in this case) from the begining
           ref = {audioRef} 
           src={currentSong.audio}
        >
        </audio>
    </div>
  );
}

export default App;