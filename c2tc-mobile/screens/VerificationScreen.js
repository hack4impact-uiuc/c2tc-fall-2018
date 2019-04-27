import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import API from "../components/API";
import { Appbar } from "react-native-paper";

class VerificationScreen extends React.Component {
  state = {
    pin: "0"
  };

  render() {
    return (
      <View>
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("TipOverview")
            }
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              Tip Overview
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.header}>Enter Verification Pin</Text>
          <TextInput
            style={styles.verificationText}
            keyboardType="numeric"
            textContentType="oneTimeCode"
            value={this.state.pin}
            maxLength={6}
            onChange={e => this.setState({ pin: e })}
          />
          <TouchableOpacity style={styles.submit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 50
  },
  submit: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    width: 150,
    borderRadius: 7,
    padding: 10,
    marginTop: 20
  },
  submitText: {
    color: "white",
    fontSize: 20
  },
  verificationText: {
    fontSize: 25,
    padding: 10,
    width: 110,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 1
  },
  content: {
    height: Dimensions.get("window").height - 75,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  }
});

export default VerificationScreen;
