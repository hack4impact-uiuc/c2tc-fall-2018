import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import call from 'react-native-phone-call'

const myButton = (
    <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
      Login with Facebook
    </Icon.Button>
  );  

const args = {
    number: '6509069888',
    prompt: false
  }

export default class PhoneButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type
    };
  }

  componentDidMount() {}

  getType() {
    return this.state.type;
  }

  _onPressCall() {
    call(args).catch(console.error)
  }

  render() {
    return (
        <Icon.Button name="phone" backgroundColor="#424242" onPress={this._onPressCall}>
        Call Neeraj
        </Icon.Button>
    );
  }
}
