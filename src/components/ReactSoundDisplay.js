import React, { Component }  from 'react'
import PropTypes             from 'prop-types';
import AudioContext           from '../libs/AudioContext';
import AudioPlayer            from '../libs/AudioPlayer';
import Visualizer             from '../libs/Visualizer';

export default class ReactSoundDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      analyser: null,
      audioCtx: null,
      canvas: null,
      canvasCtx: null
    }
  }

  componentDidMount() {
    const { onStop, audioElem } = this.props;
    const { visualizer } = this.refs;
    const canvas = visualizer;
    const canvasCtx = canvas.getContext("2d");
    const analyser = AudioContext.getAnalyser();
    const audioCtx = AudioContext.getAudioContext();

    this.setState({
      analyser: analyser,
      audioCtx: audioCtx,
      canvas: canvas,
      canvasCtx: canvasCtx
    }, () => {
      this.visualize();
    });

  }

  shouldComponentUpdate=(nextProps) => {
    if(nextProps.audioElem === this.props.audioElem) {
      return false;
    }
    nextProps.audioElem.onplay = this.onPlay
    return true;
  }

  onPlay = () => {
    const { audioElem } = this.props
    const { audioCtx } = this.state
    AudioPlayer.create(audioElem);
    audioCtx.resume()

  }

  visualize= () => {
    const self = this;
    const {
      backgroundColor,
      strokeColor,
      width,
      height,
      visualSetting
    } = this.props;
    const { canvas, canvasCtx, analyser } = this.state;

    if(visualSetting === 'sinewave') {
      Visualizer.visualizeSineWave(analyser, canvasCtx, canvas, width, height, backgroundColor, strokeColor);

    } else if(visualSetting === 'frequencyBars') {
      Visualizer.visualizeFrequencyBars(analyser, canvasCtx, canvas, width, height, backgroundColor, strokeColor);
    }
  }

  render() {
    const { width, height, className } = this.props
    return (
      <canvas
        ref="visualizer"
        height={height}
        width={width}
        className={className}
      />
    )
  }
}

ReactSoundDisplay.propTypes = {
  backgroundColor : PropTypes.string,
  strokeColor     : PropTypes.string,
  className       : PropTypes.string,
  height          : PropTypes.number
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
