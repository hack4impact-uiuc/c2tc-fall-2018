import React from "react";
import { Animated, View, Image, StyleSheet, Button } from "react-native";

class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0) // Initial value for opacity: 0
  };

  componentDidMount() {
    Animated.timing(
      // Animate over time
      this.state.fadeAnim, // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 1500 // Make it take a while
      }
    ).start(); // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim // Bind opacity to animated value
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default class WelcomeScreen extends React.Component {
  render() {
    return (
      <View>
        <FadeInView>
          <FadeInView>
            <Image
              style={{
                alignSelf: "center",
                width: 230,
                height: 90,
                marginTop: 70
              }}
              source={require("../assets/images/welcome/1.png")}
              resizeMode="contain"
            />
          </FadeInView>
          <Image
            style={{
              alignSelf: "center",
              width: 330,
              height: 160,
              marginTop: -15
            }}
            source={require("../assets/images/welcome/2.png")}
            resizeMode="contain"
          />
          <Image
            style={{
              alignSelf: "center",
              width: 240,
              height: 120,
              marginTop: -25
            }}
            source={require("../assets/images/welcome/3.png")}
            resizeMode="contain"
          />
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: -40
            }}
          >
            <Image
              style={{
                alignSelf: "center",
                width: 30,
                height: 30,
                margin: 10
              }}
              source={require("../assets/images/welcome/4-1.png")}
              resizeMode="contain"
            />
            <Image
              style={{
                alignSelf: "center",
                width: 30,
                height: 30,
                margin: 10
              }}
              source={require("../assets/images/welcome/4-2.png")}
              resizeMode="contain"
            />
            <Image
              style={{
                alignSelf: "center",
                width: 30,
                height: 30,
                margin: 10
              }}
              source={require("../assets/images/welcome/4-3.png")}
              resizeMode="contain"
            />
          </View>
          <Image
            style={{
              alignSelf: "center",
              width: 150,
              height: 150,
              margin: 10
            }}
            source={require("../assets/images/welcome/5.png")}
            resizeMode="contain"
          />
        </FadeInView>
        <Button
          title="Continue"
          color="black"
          style={styles.button}
          onPress={() => this.props.navigation.navigate("MapScreen")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%"
  },
  image: {
    alignSelf: "center",
    width: 330,
    height: 330,
    margin: 130
  },
  button: {
    alignItems: "center",
    backgroundColor: "#e5e5ea",
    borderRadius: 900,
    paddingTop: 17,
    width: 60,
    height: 60,
    margin: 13
  }
});
