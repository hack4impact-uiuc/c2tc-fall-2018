import React from "react";
import { FontAwesome } from "@expo/vector-icons";

import {
  Animated,
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch
} from "react-native";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingName: false,
      displayName: "Test user",
      visibleToOthers: true,
      karmaScore: 0,
      verified: false,
      tips: []
    };
  }

  async componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  handleEditPress = e => {
    if (this._mounted) {
      this.setState({
        isEditingName: true
      });
    }
  };

  handleSwitchVisiblity = e => {
    // this.setState({
    //
    // })
    console.log("SWITCHING VISIBILIY...");
  };

  handleSavePress = e => {
    if (this._mounted) {
      this.setState({
        isEditingName: false
      });
    }

    //database update
  };

  render() {
    const isEditingName = this.state.isEditingName;
    return (
      <View>
        {isEditingName ? (
          <View>
            <TextInput
              onChangeText={text => this.setState({ displayName: text })}
              placeholder={this.state.displayName}
            />
            <TouchableOpacity onPress={this.handleSavePress}>
              <FontAwesome name="save" size={32} color="green" />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text>Your name is {this.state.displayName}</Text>
            <TouchableOpacity onPress={this.handleEditPress}>
              <FontAwesome name="edit" size={32} color="green" />
            </TouchableOpacity>
          </View>
        )}
        <Text>
          Visible to other users? {this.state.visibleToOthers ? "yes" : "no"}
        </Text>
        <Switch
          value={this.state.visibleToOthers}
          onValueChage={this.handleSwitchVisiblity}
        />
        <Text>Karma score is: {this.state.karmaScore}</Text>
        <Text>You are {this.state.verified ? "" : " not "}a verified user</Text>
        <Text>Tips</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
