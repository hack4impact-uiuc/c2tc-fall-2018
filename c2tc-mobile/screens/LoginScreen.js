import React, { Component } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { AsyncStorage } from "react-native";
import API from "../components/API";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    pswd: "",
    errors: [],
    loading: false,
  };

  handleApiCall = async (errorChecks, apiCall, onSuccess) => {
    let errors = errorChecks(this);

    if (errors.length === 0){
      this.setState({ loading: true });
      const response = await apiCall(this);
      this.setState({ loading: false });
      if (!response.success){
        errors = ["Error: " + response.message]
      } else {
        await onSuccess(this, response);
      }
    }

    this.setState({ errors });
  }

  handleLogin = async () => {
    await this.handleApiCall(this.validateLogin, async (comp) => { return await API.login(comp.state.email, comp.state.pswd) }, async (comp, response) => {
      await AsyncStorage.setItem("token", response.result.token);
      await API.setVerifiedPin()
      comp.setState({ successfulSubmit: true });
      comp.props.navigation.navigate("TipOverview")
    });
  };

  handleForgotpassword = async () => {
    await this.handleApiCall(this.validateForgotPassword, async (comp) => { return await API.forgotPassword(comp.state.email) }, async (comp, response) => {
      comp.props.navigation.navigate("PasswordReset", { "email": comp.state.email });
    });
  }

  validateForgotPassword(comp) {
    if (comp.state.email.length === 0) {
      return ["Error: Email cannot be empty!"];
    }
    return [];
  }

  validateLogin(comp) {
    let errors = [];

    if (comp.state.email.length === 0) {
      errors.push("Email cannot be empty");
    }

    if (comp.state.pswd.length === 0) {
      errors.push("Password cannot be empty");
    }

    return errors;
  }

  render() {
    const { errors } = this.state;
    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <View style={styles.navBar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("NonRegistered")}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />{" "}
              Settings
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading}/>
          <Text style={styles.full_header}>Login</Text>
          <View style={styles.errors}>
            {errors.map(error => (
              <Text key={error}>{error}</Text>
            ))}
          </View>
          <Text style={styles.header}>Email</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Email"
            placeholder="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Text style={styles.header}>Password</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            secureTextEntry={true}
            label="Password"
            placeholder="Password"
            value={this.state.pswd}
            onChangeText={pswd => this.setState({ pswd })}
          />
          <TouchableOpacity style={styles.login_btn} onPress={this.handleLogin}>
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.login_btn} onPress={this.handleForgotpassword}>
            <Text style={styles.button_text}>Forgot Password</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    height: Dimensions.get("window").height,
    backgroundColor: "white"
  },
  inputContainerStyle: {
    marginHorizontal: 20,
    marginTop: 0
  },
  inputBodyContainerStyle: {
    paddingBottom: 100,
    marginHorizontal: 20,
    marginTop: 0
  },
  full_header: {
    fontWeight: "500",
    fontSize: 35,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  header: {
    fontWeight: "500",
    fontSize: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    color: "black",
    textAlign: "left",
    position: "relative"
  },
  button_text: {
    color: "white",
    fontSize: 19,
    fontWeight: "600"
  },
  login_btn: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 17,
    marginTop: 30,
    marginLeft: 20
  },
  navBar: {
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom: 10
  },
  backButton: {
    paddingLeft: 20,
    marginRight: Dimensions.get("window").width - 220
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500"
  },
  arrow: {
    paddingTop: 15
  }
});
