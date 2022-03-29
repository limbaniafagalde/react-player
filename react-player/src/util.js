export const playAudio = (isPlaying, audioRef) => {
        //check if the song is playing and when we click in another song will start playing it not paused. We need the ref to load property and indicate the play
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) { //if the song we click is undefined (not fully loaded) wait a bit to play it
                playPromise
                .then((audio) => {
                    audioRef.current.play();
                })
                .catch((error) => console.log(error));
            }
        }
}