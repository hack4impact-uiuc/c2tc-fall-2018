import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import API from "../components/API";

import {
  Animated,
  View,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Switch,
  Image
} from "react-native";

import {
  Paragraph,
  Appbar,
  List,
  Divider,
  withTheme,
  type Theme
} from "react-native-paper";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingName: false,
      displayName: "Test user",
      visibleToOthers: true,
      karmaScore: 42,
      verified: false,
      email: "user@illinois.edu",
      tips: []
    };
  }

  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.setItem("user_id", "5c86c850f875c618f8557f40");
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);
    let username = user[username];
    let karma = user[karma];
    let verified = user[verified];
    let tips = user[posted_tips];
    let anon = user[anon];

    this.setState({
      displayName: username,
      karmaScore: karma,
      verified,
      tips
    });
  }

  handleEditPress = e => {
    this.setState({
      isEditingName: true
    });
  };

  handleSwitchVisiblity = e => {
    // this.setState({
    //
    // })
    console.log("SWITCHING VISIBILIY...");
  };

  handleSavePress = e => {
    this.setState({
      isEditingName: false
    });
    //database update
  };

  handleBackPress = e => {
    console.log("Leave profile page");
  };

  render() {
    const isEditingName = this.state.isEditingName;
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.handleBackPress} />
          <Appbar.Content title="Back" />
          {isEditingName ? (
            <Appbar.Action icon="save" onPress={this.handleSavePress} />
          ) : (
            <Appbar.Action icon="edit" onPress={this.handleEditPress} />
          )}
        </Appbar.Header>
        <View style={styles.profile}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
          {isEditingName ? (
            <TextInput
              onChangeText={text => this.setState({ displayName: text })}
              placeholder={this.state.displayName}
            />
          ) : (
            <Text>{this.state.displayName} </Text>
          )}
          <Text>{this.state.karmaScore} pts. </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.profile}>
          <Text>
            Visible to other users? {this.state.visibleToOthers ? "Yes" : "No"}
          </Text>
          {isEditingName ? (
            <Switch
              value={this.state.visibleToOthers}
              onValueChage={this.handleSwitchVisiblity}
            />
          ) : null}
        </View>
        <Divider style={styles.divider} />
        <View style={styles.profile}>
          <Paragraph>
            <FontAwesome name="envelope" size={15} />
            {this.state.email}
          </Paragraph>
        </View>
        <Divider style={styles.divider} />
        <Text>Tips</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 0
  },

  divider: {
    backgroundColor: "black"
  }
});
