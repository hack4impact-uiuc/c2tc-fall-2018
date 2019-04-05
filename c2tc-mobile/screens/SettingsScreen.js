import React from "react";
import { AsyncStorage } from "react-native";
import API from "../components/API";
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

export default class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.setItem("user_id", "5c86c850f875c618f8557f40");
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);

    this.setState({
    });
  }

  handleBackPress = e => {
    console.log("Leave settings page");
  };

  render() {
    return (
    <View>
        <View>
            <Appbar.Header>
            <Appbar.BackAction onPress={this.handleBackPress} />
            <Appbar.Content title="Settings"/>
            </Appbar.Header>
        </View>
        <View style={styles.profile}>
            <Image
            style={{ width: 50, height: 50, borderRadius: 50 / 2}}
            source={{
            uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
            />
            <View>
              <Text style={styles.name}>Phillip Kuo</Text>
              <Text style={styles.editProfile}>Edit Your Profile</Text>
            </View>
              <FontAwesome name="chevron-right" size={15} style={styles.profileArrow}/>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.list}>
            <Text style={styles.text}>Notifications</Text>
            <FontAwesome name="chevron-right" size={15} style={styles.arrow}/>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.list}>
            <Text style={styles.text}>Show App Tutorials</Text>
            <FontAwesome name="chevron-right" size={15} style={styles.arrow}/>
        </View>
        <View style={styles.divider}></View>
        </View>
    )}
}

const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
    padding: 25,
  },
  name: {
    flexDirection: "row",
    paddingLeft: 30,
    fontSize: 20
  },
  editProfile: {
    paddingLeft: 30,
    fontSize: 15,
    color: "gray"
  },
  list: {
    height: 45,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  text: {
    paddingHorizontal: 30,
    paddingTop: 10,
    fontSize: 15,
    width: Dimensions.get("window").width - 40
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  profileArrow: {
    paddingTop: 20,
    paddingLeft: 100
  },
  arrow: {
    paddingTop: 15
  }
});