import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faAngleLeft, faAngleRight, faPause,} from "@fortawesome/free-solid-svg-icons";
//import { playAudio } from "../util";

const Player = ({currentSong, 
                isPlaying, 
                setIsPlaying, 
                audioRef, 
                songInfo, 
                setSongInfo, 
                songs, 
                setCurrentSong,
                setSongs}) => {
    //UseEffect
    /*useEffect(() => {
        const newSongs = songs.map((song) => {
            if (song.id === currentSong.id) {
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

    },[currentSong]); //run this function everytime my currentSong is updated
   */

    //Event Handlers
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying); //setting the oposit
        }else{
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    const getTime = (time) => {
        return(
            //format the number in minutes and seconds
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({...songInfo, currentTime: e.target.value});
    }

    const skipTrackHandler = async (direction) =>{
        //we need to find the current index
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id); //index of the current song
        if (direction === "skip-forward") {
            //wait a bit for this action to finish
          await setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
            //we need to use modulus (%) to reset to 0 the state until it finish (it gonna happen when the currentIndex +1 is = to the length of the array because the reminder will be 0)
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if (direction === "skip-back") {
            if ((currentIndex - 1) % songs.length === -1) {
            await setCurrentSong(songs[songs.length - 1]); 

            activeLibraryHandler(songs[songs.length - 1]);

                //is gonna send us to the last song (example if I have 8 objects this will be 8-1=7 and its fine because the arrays starts from 0)
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]); 
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }

        if(isPlaying) audioRef.current.play();
                
    }

    //we want to run it when we skip back or forward
    const activeLibraryHandler = (nextPrev) =>{
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
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

    }

    //Add the Styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
 
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
               <div style = {{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input 
                            onChange = {dragHandler} 
                            min = {0}
                            max = {songInfo.duration || 0} //we need to give a default value because it take a few minutes in load 
                            value = {songInfo.currentTime} 
                            type = "range" 
                    />
                    <div style = {trackAnim} className="animate-track"></div>
               </div>

                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon onClick = {() => skipTrackHandler("skip-back")} className="skip-back" size = "2x" icon= {faAngleLeft}/>
                <FontAwesomeIcon 
                    onClick={playSongHandler} 
                    className="play" 
                    size = "2x" 
                    icon= {isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon onClick = {() => skipTrackHandler("skip-forward")} className="skip-forward" size = "2x" icon= {faAngleRight}/>
            </div>
        </div>
    )
}

export default Player;