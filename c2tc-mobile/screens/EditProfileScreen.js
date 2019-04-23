import React from "react";
import API from "../components/API";

import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import {
  Appbar,
  TextInput
} from "react-native-paper";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.getParam('user', 'no user').username,
      password: this.props.navigation.getParam('user', 'no user').password,
      user: this.props.navigation.getParam('user', 'no user')
    }
  }


  async onChangePassword(password){
    this.setState({password})
    let data = {
      password
    }
    await API.updateUser(this.state.user._id, data)
    let currentUser = this.state.user;
    currentUser.password = password
    this.setState({user:currentUser})
  };
  async onChangeUserName(username){
    this.setState({username})
    let data = {
      username
    }
    await API.updateUser(this.state.user._id, data)
    let currentUser = this.state.user;
    currentUser.username = username
    this.setState({user:currentUser})
  };

  render() {
    return (
        <View behavior="padding" enabled>
            <View>
                <Appbar.Header>
                <Appbar.BackAction style={styles.backButton} onPress={() => this.props.navigation.navigate("Settings", {user: this.state.user})} />
                <Appbar.Content titleStyle={styles.backHeader} title = "Save Changes" onPress={() => this.props.navigation.navigate("Settings", {user: this.state.user})}/>
                </Appbar.Header>
            </View>
            <Text style = {styles.sectionHeader}>Personal Information</Text>
            <View style={styles.profile}>
              <Image
              style={{ width: 50, height: 50, borderRadius: 50 / 2}}
              source={{
              uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }}
              />
              <View>
                  <Text style={styles.changePicture}>Change Picture</Text>
              </View>
            </View>
            <View style = {styles.textInput}>
                <TextInput
                    onChangeText={(e) => this.onChangeUserName(e)}
                    value={this.state.username}
                />
            </View>
            <View style = {styles.textInput}>
                <TextInput
                    placeholder = "Password"
                    onChangeText={(e) => this.onChangePassword(e)}
                    value={this.state.password}
                />
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
  backButton:{
    marginRight:0,
    paddingRight:0,
  },
  sectionHeader: {
      paddingTop: 20,
      paddingLeft: 20,
      fontWeight: "bold",
      fontSize: 20
  },
  profile: {
    flexDirection: "row",
    padding: 25,
  },
  changePicture: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 15
  },
  textInput: {
      padding: 10
  },
  backHeader: {
    marginLeft: -10
  },
});