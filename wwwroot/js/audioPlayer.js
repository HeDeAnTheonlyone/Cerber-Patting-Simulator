window.audioPlayer = {
    isPlaying: false,
    isLooping: false,


    play: function (audioElem) {
        if (this.isPlaying) return;

        if (!audioElem.hasTimeUpdateListener) {
            audioElem.hasTimeUpdateListener = true;
            
            audioElem.addEventListener('timeupdate', () => {
                if (this.isLooping == false) return;

                if (audioElem.currentTime >= 3.120) {
                    audioElem.currentTime = 1.874;
                }
            });
        }

        audioElem.play()
        this.isPlaying = true;
        this.isLooping = true;

        if (!audioElem.hasEndedListener) {
            audioElem.hasEndedListener = true;

            audioElem.addEventListener('ended', () => {
                this.isPlaying = false;
                
                window.dotNetObjRef.invokeMethodAsync('UnblockPatting');
            })
        }
    },


    setLoop: function (value) {
        this.isLooping = value;
    }
};
