import React, { Component } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  Modal,
  TouchableHighlight,
  Text,
} from "react-native";

import {Button} from "react-native-paper";


class AlertScreen extends React.Component {
  state = {
    modalVisible: false,
  };

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: props.shouldDisplayAlert,
      attemptedAction: props.attemptedAction
    }
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  attemptLogin = () => {
    console.log("HELLO WORLD")
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Sorry, in order to {this.state.attemptedAction}, you must login!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
            <Button mode="contained" onPress = {this.attemptLogin} > Sign-up or login with illinois email </Button>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default AlertScreen;
const styles = StyleSheet.create({
  alert: {
    position: 'absolute'
  }
})
