// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

import React, { Component }   from 'react'
import AudioContext           from '../libs/AudioContext';
import AudioPlayer            from '../libs/AudioPlayer';
import Visualizer             from '../libs/Visualizer';


export default class ReactSoundDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyser            : null,
      canvas              : null,
      canvasCtx           : null
    }
  }

  componentDidMount() {
    const { onStop, audioElem } = this.props;
    const { visualizer } = this.refs;
    const canvas = visualizer;
    const canvasCtx = canvas.getContext("2d");

    if(audioElem) {
      const analyser = AudioContext.getAnalyser();

      AudioPlayer.create(audioElem);

      this.setState({
        analyser            : analyser,
        canvas              : canvas,
        canvasCtx           : canvasCtx
      }, () => {
        this.visualize();
      });

      this.setAudioMode(this.props);
    }

  }

  setAudioMode(props) {
    const { play } = props;

    if(play) {
      AudioPlayer.play();
    } else {
      AudioPlayer.stop();
    }
  }

  componentWillReceiveProps(nextProps) {
   this.setAudioMode(nextProps);
  }

  visualize= () => {
    const self = this;
    const { backgroundColor, strokeColor, width, height, visualSetting } = this.props;
    const { canvas, canvasCtx, analyser } = this.state;

    if(visualSetting === 'sinewave') {
      Visualizer.visualizeSineWave(analyser, canvasCtx, canvas, width, height, backgroundColor, strokeColor);

    } else if(visualSetting === 'frequencyBars') {
      Visualizer.visualizeFrequencyBars(analyser, canvasCtx, canvas, width, height, backgroundColor, strokeColor);

    }

  }

  render() {
    const { width, height, className } = this.props;
    return (<canvas ref="visualizer" height={height} width={width} className={className}></canvas>);
  }
}

ReactSoundDisplay.propTypes = {
  backgroundColor : React.PropTypes.string,
  strokeColor     : React.PropTypes.string,
  className       : React.PropTypes.string,
  height          : React.PropTypes.number,
  play            : React.PropTypes.bool
};

ReactSoundDisplay.defaultProps = {
  backgroundColor : 'rgba(255, 255, 255, 0.5)',
  strokeColor     : '#000000',
  className       : 'visualizer',
  record          : false,
  width           : 640,
  height          : 100,
  visualSetting   : 'sinewave'
}