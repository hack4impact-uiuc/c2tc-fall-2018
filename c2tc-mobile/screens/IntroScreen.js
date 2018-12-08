import React from "react";
import {
  Animated,
  View,
  Image,
  Text,
  ImageBackground,
  Button
} from "react-native";

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

class IntroScreen extends React.Component {
  render() {
    return (
      <ImageBackground
        source={require("../assets/images/welcome/0.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <Image
          style={{
            alignSelf: "center",
            width: 330,
            height: 330,
            margin: 130
          }}
          source={require("../assets/images/welcome/0-1.png")}
          resizeMode="contain"
        />
        // =========================== // TODO: add a "Get Started" Button //
        (refer to https://philkuo.com/hack4impact/c2tc_mockup_current/ for
        details) // ===========================
        <Button
          title="Get Started"
          color="white"
          onClick={() => this.props.navigation.goBack()}
        />
      </ImageBackground>
    );
  }
}

export default IntroScreen;
