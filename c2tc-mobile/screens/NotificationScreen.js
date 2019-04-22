import React from "react";
import { AsyncStorage } from "react-native";
import API from "../components/API";
import ToggleSwitch from 'toggle-switch-react-native'

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
    this.state = {
      locationTips: false,
      illiniAlerts: false,
      productUpdates: false
    };
  }

  async componentDidMount() {
    this._mounted = true;
    let locationTips = await AsyncStorage.getItem("location_tips");
    if (locationTips) {
      this.setState({
        locationTips: true
      });
    }
    let illiniAlerts = await AsyncStorage.getItem("illini_alerts");
    if (illiniAlerts) {
      this.setState({
        illiniAlerts: true
      });
    }
    let productUpdates = await AsyncStorage.getItem("product_updates");
    if (productUpdates) {
      this.setState({
        productUpdates: true
      });
    }
  }

  handleBackPress = e => {
    this.props.navigation.goBack();
  };

  setAndStoreState = async (stateVar) => {
    console.log(stateVar);
    if (stateVar === "locationTips") {
      this.setState({locationTips: !this.state.locationTips});
      if (this.state.locationTips) {
        await AsyncStorage.setItem("location_tips", "true");
      } else {
        await AsyncStorage.removeItem("location_tips");
      }
    }
    if (stateVar === "illiniAlerts") {
      this.setState({illiniAlerts: !this.state.illiniAlerts});
      if (this.state.illiniAlerts) {
        await AsyncStorage.setItem("illini_alerts", "true");
      } else {
        await AsyncStorage.removeItem("illini_alerts");
      }
    } 
    if (stateVar === "productUpdates") {
      this.setState({productUpdates: !this.state.productUpdates});
      if (this.state.productUpdates) {
        await AsyncStorage.setItem("product_updates", "true");
      } else {
        await AsyncStorage.removeItem("product_updates");
      }
    }
  }

  render() {
    return (
      <View>
        <View>
          <Appbar.Header>
          <Appbar.BackAction onPress={this.handleBackPress} />
          <Appbar.Content title="Notifications"/>
          </Appbar.Header>
        </View>

        <Text>{"\n"}</Text>

        <View style={styles.listItem}>
          <Text style={styles.text}>Location Tips</Text>
          <View style={styles.switch}>
            <ToggleSwitch
            style={styles.switch}
            isOn={this.state.locationTips}
            onColor='green'
            offColor='gray'
            size='small'
            onToggle={() => this.setAndStoreState("locationTips")}
            />
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.listItem}>
          <Text style={styles.text}>Illini Alerts</Text>
            <View style={styles.switch}>
              <ToggleSwitch
              isOn={this.state.illiniAlerts}
              onColor='green'
              offColor='gray'
              size='small'
              onToggle={() => this.setAndStoreState("illiniAlerts")}
              />
            </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.listItem}>
          <Text style={styles.text}>Product Updates</Text>
            <View style={styles.switch}>
              <ToggleSwitch
              isOn={this.state.productUpdates}
              onColor='green'
              offColor='gray'
              size='small'
              onToggle={() => this.setAndStoreState("productUpdates")}
              />
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  switch: {
    paddingTop: 15
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  listItem: {
    height: 45,
    flexDirection: "row",
    alignItems: "flex-start"
  },
  text: {
    paddingHorizontal: 30,
    paddingTop: 10,
    fontSize: 15,
    width: Dimensions.get("window").width - 80
  }
});