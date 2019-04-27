import React from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Dimensions,
} from "react-native";

import { Appbar, Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");

export default class AlertScreen extends React.Component {

  handleBackPress = e => {
    this.props.navigation.navigate("TipOverview");
  };

  render() {
    return (
      <View style={{ marginTop: 22 }}>
          <Appbar.Header>
              <Appbar.BackAction
                style={styles.backButton}
                onPress={this.handleBackPress}
              />
              <Appbar.Content
                titleStyle={styles.backHeader}
                title="Login/Register"
                onPress={this.handleBackPress}
              />
            </Appbar.Header>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text style={styles.reason_text}>
                Sorry, in order to access this feature you must login!
              </Text>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row" }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress ={() => this.props.navigation.navigate("Login")}
              >
                Login
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Registration")}
              >
                Register
              </Button>
            </View>
            <View style={{ justifyContent: "center", flexDirection: "row", marginTop: 22 }}>
              <Button
                mode="contained"
                style={styles.button}
                onPress={() => this.props.navigation.navigate("Verify")}
              >
                Verify
              </Button>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reason_text: {
    margin: 10
  },
  button: {
    width: "40%"
    // flex: 0.3
  },
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  },
  alert: {
    position: "absolute"
  }
});