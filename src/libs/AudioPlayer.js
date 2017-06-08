import AudioContext from './AudioContext';

const AudioPlayer =  {

  create(audioElem) {



    this.audio = new Audio();
    this.audio.src = audioElem;

    const audioCtx = AudioContext.getAudioContext();
    const analyser = AudioContext.getAnalyser();
    const source = audioCtx.createMediaElementSource(this.audio);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  },

  play() {
    this.audio.play();
  },

  stop() {
    if(this.audio){
      this.audio.pause();
    }
  }

}

export default AudioPlayer;