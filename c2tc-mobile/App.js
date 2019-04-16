import React, { Component } from "react";
import { StyleSheet, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";
import API from "./components/API";

import MapScreen from "./screens/MapScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import IntroScreen from "./screens/IntroScreen";
import TipForm from "./screens/TipForm";
import TipScreen from "./screens/TipScreen";
import TipDetailsScreen from "./screens/TipDetailsScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { Notifications, Location, TaskManager, Permissions } from 'expo';

const LOCATION_TASK_NAME = 'background-location-task';

export default class App extends Component {
  beginListeningToLocation = async () => {
    console.log("Setting up startLocationUpdatesAsync");
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
  };

  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    let is_loaded = await AsyncStorage.getItem("loaded");
    if (is_loaded) {
      this._mounted = true;
    } else {
      await AsyncStorage.setItem("loaded", JSON.stringify(1));
    }
    console.log("running cod");
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    console.log("running cod2");
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      console.log("oh noes, no location permission!");
    } else {
      Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
    console.log("calling async function beginListeningToLocation");
    await this.beginListeningToLocation();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    return <Navigator />;
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
  Map: {
    screen: MapScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  TipOverview: {
    screen: TipScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  TipDetail: {
    screen: TipDetailsScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  TipForm: {
    screen: TipForm,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
      headerMode: "screen"
    }
  }
});

function shouldNotify(eventsNearby){
  return true;
}

function createNotificationData(eventsNearby){
  const localnotification = {
    title: 'Example Title!',
    body: 'This is the body text of the local notification',
    android: {
      sound: true,
    },
    ios: {
      sound: true,
    },
  };
  return localnotification;
}

handleNewLocation = async ( { data, error }) => {
  if (error) {
    return;
  }
  if (data) {
    const { locations } = data;
    console.log("NEW BACKGROUND LOCATION CAME IN!!!");
    console.log(locations);
    eventsNearby = await API.getTips();

    if (shouldNotify(eventsNearby)){
      const notificationData = createNotificationData(eventsNearby);
      const schedulingOptions = { time: Date.now() + 1000 };
      Notifications.scheduleLocalNotificationAsync(
        notificationData,
        schedulingOptions
      );
    }
  };
}

TaskManager.defineTask(LOCATION_TASK_NAME, handleNewLocation);
