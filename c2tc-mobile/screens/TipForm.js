import React from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Picker
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput, withTheme } from "react-native-paper";
import API from "../components/API";
import { Location } from "expo";
import Color from "../constants/Colors";
import {addressToLatLong as addressToLatLong} from "../components/Geocoding";

class TipForm extends React.Component {
  state = {
    title: "",
    body: "",
    category: "",
    author: "Megha Mallya",
    userId: "5c86c850f875c618f8557f40",
    location: null,
    address: "",
    lat:"0",
    lng:"0",
    errors: []
  };

  async componentWillMount() {
    let location = await Location.getCurrentPositionAsync({});
    this.setState({
      location
    });
  }
  setCategory = category => {
    this.setState({ category });
  };
  categoryStyle = function(buttonCategory) {
    if (buttonCategory === this.state.category) {
      return {
        backgroundColor: Color[this.state.category]
      };
    }
  };

  handSubmitTip = async () => {
    const errors = this.validate();
    if (this.state.address.length !== 0) {
      const latlng = await addressToLatLong(this.state.address);
      this.state.lat = latlng[0];
      this.state.lng = latlng[1];
      console.log(this.state.lat);
      console.log(this.state.lng);
    }

    if (errors.length > 0) {
      this.setState({errors});
      console.log(errors);
      return;
    }

    if (this.state.errors.length === 0) {
      console.log(this.state.errors);
      tip = {
        title: this.state.title,
        content: this.state.body,
        user_id: this.state.userId,
        latitude: this.state.lat,
        longitude: this.state.lng,
        category: this.state.category
      };
      await API.createTip(tip);
      this.props.navigation.navigate("TipOverview");
    }
  };

  validate() {
    const errors = [];

    if (this.state.title.length === 0) {
      errors.push("Name cannot be empty");
    }

    if (this.state.body.length === 0) {
      errors.push("Body cannot be empty");
    }

    if (this.state.address.length === 0) {
      // this.state.lat = this.state.location.latitude;
      // this.state.lng = this.state.location.longitude;
      errors.push("Address cannot be empty")
    }

    if (this.state.category.length === 0) {
      errors.push("Please select a category");
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
        <View style={styles.backHeader}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              <FontAwesome name="chevron-left" size={20} color="#027BFF" /> Back
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps={"always"}
          removeClippedSubviews={false}
        >
          {errors.map(error => (
            <Text key={error}>Error: {error}</Text>
          ))}
          <Text style={styles.header}>Tip Title</Text>
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Tip Title"
            placeholder="Title of your tip"
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <Text style={styles.header}>Tip Content</Text>
          <TextInput
            mode="outlined"
            style={styles.inputBodyContainerStyle}
            label="Tip Content"
            placeholder="Content of your tip"
            value={this.state.body}
            onChangeText={body => this.setState({ body })}
          />
          <Text style={styles.header}>Tip Location</Text>
          <TextInput
            mode="outlined"
            style={styles.inputBodyContainerStyle}
            label="Tip Location"
            placeholder="Location of your tip"
            value={this.state.address}
            onChangeText={address => this.setState({ address })}
          />
          <Text style={styles.header}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.category}
              style={styles.picker}
              onValueChange={this.setCategory}
            >
              <Picker.Item color={Color.campus} label="Campus" value="campus" />
              <Picker.Item color={Color.safety} label="Safety" value="safety" />
              <Picker.Item color={Color.food} label="Food" value="food" />
              <Picker.Item
                color={Color.traffic}
                label="Traffic"
                value="traffic"
              />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.submit_tip}
            onPress={this.handSubmitTip}
          >
            <Text style={styles.button_text}>Submit Tip</Text>
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
  backButton: {
    paddingLeft: 20,
    width: Dimensions.get("window").width
  },
  backText: {
    color: "#027BFF",
    fontSize: 20
  },
  backHeader: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "black",
    width: 200,
    borderRadius: 5,
    marginLeft: 20
  },
  picker: {
    //marginBottom:100,
    height: 50,
    width: 200
  },
  wrapper: {
    flex: 1,
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
  submit_tip: {
    alignItems: "center",
    backgroundColor: "#8E44AD",
    borderRadius: 7,
    width: Dimensions.get("window").width - 40,
    paddingVertical: 17,
    marginTop: 30,
    marginLeft: 20
  },
  error: {
    borderRadius: 1,
    borderColor: "red"
  }
});

export default withTheme(TipForm);
