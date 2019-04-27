import React from "react";
import API from "../components/API";

import { View, Text, StyleSheet, Image, Button, Modal } from "react-native";

import { Appbar, TextInput } from "react-native-paper";

export default class EditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.navigation.getParam("user", "no user").username,
      password: this.props.navigation.getParam("user", "no user").password,
      user: this.props.navigation.getParam("user", "no user"),
      url: "",
      modalVisible: false
    };
  }

  async onChangePassword(password) {
    this.setState({ password });
    let data = {
      password
    };
    await API.updateUser(this.state.user._id, data);
    let currentUser = this.state.user;
    currentUser.password = password;
    this.setState({
      user: currentUser
    });
  }
  async onChangeUserName(username) {
    this.setState({ username });
    let data = {
      username
    };
    await API.updateUser(this.state.user._id, data);
    let currentUser = this.state.user;
    currentUser.username = username;
    this.setState({ user: currentUser });
  }

  async onChangePicture(picture) {
    this.setState({
      url: picture
    });
  }

  openModal = () => {
    this.setState({ modalVisible: true });
  };

  closeModal = async () => {
    console.log(this.state.url);
    let data = {
      pro_pic: this.state.url
    };
    await API.updateUser(this.state.user._id, data);
    let currentUser = this.state.user;
    this.setState({ user: currentUser });
    this.setState({ modalVisible: false });
  };

  render() {
    return (
      <View behavior="padding" enabled>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View>
            <Text style={styles.modalText}>Enter URL for new picture:</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={e => this.onChangePicture(e)}
              value={this.state.url}
            />
            <Text onPress={this.closeModal} style={styles.modalSave}>
              Save
            </Text>
          </View>
        </Modal>
        <View>
          <Appbar.Header>
            <Appbar.BackAction
              style={styles.backButton}
              onPress={() =>
                this.props.navigation.navigate("Settings", {
                  user: this.state.user
                })
              }
            />
            <Appbar.Content
              titleStyle={styles.backHeader}
              title="Save Changes"
              onPress={() =>
                this.props.navigation.navigate("Settings", {
                  user: this.state.user
                })
              }
            />
          </Appbar.Header>
        </View>
        <View style={styles.profile}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2 }}
            source={{
              uri: this.state.user.pro_pic
            }}
          />
          <View>
            <Text onPress={this.openModal} style={styles.changePicture}>
              Change Picture >
            </Text>
          </View>
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={e => this.onChangeUserName(e)}
          value={this.state.username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={e => this.onChangePassword(e)}
          value={this.state.password}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  profile: {
    flexDirection: "row",
    padding: 35
  },
  changePicture: {
    flexDirection: "row",
    paddingLeft: 30,
    paddingTop: 10,
    fontSize: 17
  },
  textInput: {
    marginVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    marginHorizontal: 35
  },
  backHeader: {
    marginLeft: -10
  },
  modalText: {
    fontSize: 20,
    padding: 30,
    alignSelf: "center"
  },
  modalSave: {
    fontSize: 20,
    alignSelf: "center",
    paddingTop: 30
  }
});
