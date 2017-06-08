import React, {Component}          from 'react';
import { render }                  from 'react-dom';
import { FloatingActionButton,
        MuiThemeProvider }         from 'material-ui';
import injectTapEventPlugin        from 'react-tap-event-plugin';
import Play                        from 'material-ui/svg-icons/av/play-arrow';
import Stop                        from 'material-ui/svg-icons/av/stop';

import { ReactSoundDisplay }       from '../../src';
import sampleAudio                 from './432Hz_Tibetan_Bowls.mp3';
import ReactGA                     from 'react-ga';

require ('./styles.scss');

injectTapEventPlugin();

// ReactGA.initialize('UA-98862819-1');

export default class Demo extends Component {
  constructor(props){
    super(props);
    this.state = {
      play      : true,
      isPlaying : true
    }
  }

  componentDidMount() {
    ReactGA.pageview(window.location.pathname);
  }

  play= () => {
    this.setState({
      play     : true,
      isPlaying: true
    });
  }

  stop= () => {
    this.setState({
      play      : false,
      isPlaying : false
    });
  }

  render() {
    const { play, isPlaying } = this.state;

    return(
      <MuiThemeProvider>
        <div>
          <h1>React-Sound-Display</h1>
          <p><a href="https://github.com/hackingbeauty/react-sound-display">Documentation</a></p>
          <ReactSoundDisplay
            className="react-sound-display"
            audioElem={sampleAudio}
            play={play}
            backgroundColor="#FF4081"
            visualSetting="frequencyBars"
            strokeColor="#000000" />
          <br />
          <br />
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={isPlaying}
            onClick={this.play}>
            <Play />
          </FloatingActionButton>
          <FloatingActionButton
            className="btn"
            secondary={true}
            disabled={!isPlaying}
            onClick={this.stop}>
            <Stop />
          </FloatingActionButton>
          <br />
          <br />
          <br />
          <p>As featured in the course <br /><a href="http://singlepageapplication.com">How to Write a Single Page Application</a></p>
        </div>
    </MuiThemeProvider>
    );
  }
}

render(<Demo/>, document.querySelector('#demo'))
