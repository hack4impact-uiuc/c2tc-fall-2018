import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import api from "./components";

import MapScreen from "./screens/MapScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroScreen from "./screens/IntroScreen";
import { Provider, connect } from "react-redux";
import { store, reduxifiedNavigator } from "./Redux";

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    console.log(api.getUsers());
    data = {
      net_id: "alicesf2",
      username: "alicesf2",
      verified: False,
      anon: False
    };
    console.log(api.createUser(data));
    if (AsyncStorage.getAllKeys().length != 1) {
      await AsyncStorage.setItem("loaded", JSON.stringify(1));
    } else {
      this._mounted = true;
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <Navigator />;
    // if (this._mounted) {
    //   return(
    //     <Provider store={store}>
    //       <LiveLocation  navigation={this.props.navigation} />
    //     </Provider>
    //   );
    // }

    // return <IntroScreen navigation={this.props.navigation} />
  }
}

Navigator = createStackNavigator({
  Intro: {
    screen: IntroScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
