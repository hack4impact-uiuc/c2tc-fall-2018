import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import TipOverview from "../components/TipOverview";
import { NavigationEvents } from "react-navigation";
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
  Image,
  ScrollView,
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
      user_id: "",
      displayName: "",
      visibleToOthers: true,
      karmaScore: 0,
      verified: false,
      email: "",
      tips: []
    };
  }

  async componentDidMount() {
    this._mounted = true;
    await AsyncStorage.setItem("user_id", "5c86c850f875c618f8557f40");
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);
    let tips = await API.getTipsFromUser(user_id);
    let email = user.net_id + "@illinois.edu";

    this.setState({
      user_id,
      displayName: user.username,
      karmaScore: user.karma,
      verified: user.verified,
      tips,
      visibleToOthers: !user.anon,
      email
    });
  }

  onComponentFocused = async () => {
    let user_id = await AsyncStorage.getItem("user_id");
    let user = await API.getUser(user_id);
    let tips = await API.getTipsFromUser(user_id);
    let email = user.net_id + "@illinois.edu";
    
    this.setState({
      displayName: user.username,
      email,
      tips
    });
  };

  handleBackPress = e => {
    this.props.navigation.goBack();
  };

  render() {
    const isEditingName = this.state.isEditingName;
    return (
      <View>
        <ScrollView style={styles.tipOverview}>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        <View>
            <Appbar.Header>
            <Appbar.BackAction onPress={this.handleBackPress} />
            <Appbar.Content title="Profile" titleStyle = {styles.profileHeader}/>
            <Appbar.Content title = "Settings" titleStyle = {styles.settingsHeader} onPress = {() => this.props.navigation.navigate("Settings")}/>
            </Appbar.Header>
        </View>
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
          <View style={styles.content}>
            {this.state.tips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profileHeader: {
    alignSelf: "center"
  },
  settingsHeader: {
    alignSelf: "flex-end"
  },
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
  },

  tipOverview: {
    backgroundColor: "white"
  },
  content: {
    paddingHorizontal: 35,
  },
});
