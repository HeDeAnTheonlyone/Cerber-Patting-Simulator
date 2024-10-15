
const loopStartTime = 1.874;
const loopEndTime = 3.154;
let audioContext = null;
let audioBuffer = null;
let sourceNode = null;

window.audioPlayer = {
    isPlaying: false,
    isLooping: false,

    init: async function () {
        audioContext = new (window.AudioContext || window.webkitAudioContext);
        const response = await fetch('assets/audio/mygosh.mp3');
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    },

    play: function () {
        if (this.isPlaying) return;

        createSourceNode();

        sourceNode.start();
        setTimeout(loopAudio, loopEndTime * 1000);

        this.isPlaying = true;
        this.isLooping = true;
    },

    setLoop: function (value) {
        this.isLooping = value;
    }
};

function loopAudio () {
    if (!audioPlayer.isLooping) return;

    disposeSourceNode();
    createSourceNode();

    sourceNode.start(0, loopStartTime);
    setTimeout(loopAudio, (loopEndTime - loopStartTime) * 1000);

}

function createSourceNode() {
    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioContext.destination);
    sourceNode.onended = onAudioEnded;
}

function disposeSourceNode() {
    sourceNode.stop();
    sourceNode.disconnect();
    sourceNode = null;
}

function onAudioEnded() {
    if (audioPlayer.isLooping) return;
    audioPlayer.isPlaying = false;
    disposeSourceNode();
    window.dotNetObjRef.invokeMethodAsync("OnAudioEnded");
}
