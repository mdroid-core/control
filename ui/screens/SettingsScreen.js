import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {
  listenOrientationChange as loc,
  removeOrientationListener as rol,
} from 'react-native-responsive-screen';
import reloadStyles from '../styles/screen.js';
import ButtonGroup from '../components/ButtonGroup.js';
import ButtonGroupTitle from '../components/ButtonGroupTitle.js';

export default class SettingsScreen extends React.Component {
  componentDidMount() {
    loc(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.settings !== this.props.settings &&
      this.props.settings !== undefined
    ) {
      this.setState({
        autolock:
          'MDROID' in this.props.settings &&
          'AUTOLOCK' in this.props.settings.MDROID
            ? this.props.settings.MDROID.AUTOLOCK
            : 'N/A',
        wireless:
          'WIRELESS' in this.props.settings &&
          'LTE' in this.props.settings.WIRELESS
            ? this.props.settings.WIRELESS.LTE
            : 'N/A',
        angelEyes:
          'ANGEL_EYES' in this.props.settings &&
          'POWER' in this.props.settings.ANGEL_EYES
            ? this.props.settings.ANGEL_EYES.POWER
            : 'N/A',
        videoRecording:
          'BOARD' in this.props.settings &&
          'VIDEO_RECORDING' in this.props.settings.BOARD
            ? this.props.settings.BOARD.VIDEO_RECORDING
            : 'N/A',
        exhaustNoise:
          'SOUND' in this.props.settings &&
          'EXHAUST_NOISE' in this.props.settings.SOUND
            ? this.props.settings.SOUND.EXHAUST_NOISE
            : 'N/A',
        variableSpeedVolume:
          'SOUND' in this.props.settings && 'VSV' in this.props.settings.SOUND
            ? this.props.settings.SOUND.VSV
            : 'N/A',
      });
    }
  }

  componentWillUnMount() {
    rol();
  }

  constructor(props) {
    super(props);

    this.state = {
      angelEyes: 'N/A',
      sentryMode: 'N/A',
      exhaustNoise: 'N/A',
      variableSpeedVolume: 'N/A',
      wireless: 'N/A',
      autolock: 'N/A',
      toasted: 0,
      fails: 0,
    };
  }

  // Handler for update
  _requestUpdate = async (component, setting, value) => {
    this.props.postRequest(
      '/settings/' + component + '/' + setting + '/' + value,
      '',
    );
  };

  render() {
    // Responsive styling
    var {height, width} = Dimensions.get('window');
    var styles = reloadStyles(height < width, global.isConnected);

    return (
      <View style={styles.screenView}>
        <View
          style={[
            styles.container,
            styles.containerPadding,
            styles.titleContainer,
          ]}>
          <Text style={styles.mainTitleText}>Settings</Text>
        </View>
        <View style={[styles.largeContainer, styles.colContainer]}>
          <ButtonGroupTitle title="Angel Eyes" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('ANGEL_EYES', 'POWER', 'OFF'),
              () => this._requestUpdate('ANGEL_EYES', 'POWER', 'AUTO'),
              () => this._requestUpdate('ANGEL_EYES', 'POWER', 'ON'),
            ]}
            status={this.state.angelEyes}
          />

          <ButtonGroupTitle title="Auto Locking" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('MDROID', 'AUTOLOCK', 'OFF'),
              () => this._requestUpdate('MDROID', 'AUTOLOCK', 'AUTO'),
              () => this._requestUpdate('MDROID', 'AUTOLOCK', 'ON'),
            ]}
            status={this.state.autolock}
          />

          <ButtonGroupTitle title="Video Recording" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('BOARD', 'VIDEO_RECORDING', 'OFF'),
              () => this._requestUpdate('BOARD', 'VIDEO_RECORDING', 'ON'),
            ]}
            status={this.state.videoRecording}
          />

          <ButtonGroupTitle title="LTE" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('WIRELESS', 'LTE', 'OFF'),
              () => this._requestUpdate('WIRELESS', 'LTE', 'ON'),
            ]}
            status={this.state.wireless}
          />

          <ButtonGroupTitle title="Enhanced Exhaust" />
          <ButtonGroup
            buttons={['Off', 'Auto', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('SOUND', 'EXHAUST_NOISE', 'OFF'),
              () => this._requestUpdate('SOUND', 'EXHAUST_NOISE', 'AUTO'),
              () => this._requestUpdate('SOUND', 'EXHAUST_NOISE', 'ON'),
            ]}
            status={this.state.exhaustNoise}
          />

          <ButtonGroupTitle title="Variable Speed Volume" />
          <ButtonGroup
            buttons={['Off', 'On']}
            buttonFunctions={[
              () => this._requestUpdate('SOUND', 'VSV', 'OFF'),
              () => this._requestUpdate('SOUND', 'VSV', 'ON'),
            ]}
            status={this.state.variableSpeedVolume}
          />
        </View>
      </View>
    );
  }
}
