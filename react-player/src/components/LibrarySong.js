import React from "react";
import { playAudio } from "../util";

const LibrarySong = ({song, 
                      setCurrentSong, 
                      songs, 
                      id, 
                      audioRef, 
                      isPlaying, 
                      setSongs}) => {
    
    const songSelectHandler = () =>{
        const selectedSong = song;
        setCurrentSong(selectedSong);
        //Add Active State
        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return{
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active: false,
                }
            }
        });
        setSongs(newSongs);
        
        //check if the song is playing and when we click in another song will start playing it not paused. We need the ref to load property and indicate the play
        playAudio(isPlaying, audioRef);
    };
    
    return(
        <div onClick = {songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
            <img alt= {song.name} src= {song.cover}></img>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>

        </div>
    )
}

export default LibrarySong;