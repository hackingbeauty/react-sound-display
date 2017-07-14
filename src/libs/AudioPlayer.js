import AudioContext from './AudioContext';

let audioSource;

const AudioPlayer =  {

  create(audioElem) {
    const audioCtx = AudioContext.getAudioContext();
    const analyser = AudioContext.getAnalyser();
    let source;

    if(audioSource) {
      source = audioSource;
    } else {
      source = audioCtx.createMediaElementSource(audioElem);
      audioSource = source;
    }

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

}

export default AudioPlayer;