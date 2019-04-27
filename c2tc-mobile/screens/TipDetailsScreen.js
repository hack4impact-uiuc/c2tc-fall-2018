import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import Tag from "../components/Tag";
import { FontAwesome } from "@expo/vector-icons";
import API from "../components/API";
import { Appbar } from "react-native-paper";


class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 87,
      username: "",
      tip: this.props.navigation.state.params.tip,
      screenStyle: this.props.navigation.state.params.screenType,
      tips: this.props.navigation.state.params.tips,
    };
  }

  async componentDidMount() {
    let author = await API.getUser(
      this.props.navigation.state.params.tip.author
    );
    let username = author.username;
    if (author.anon) {
      username = "Anonymous";
    }

    this.setState({
      username
    });
  }

  render() {
    let tip = this.props.navigation.state.params.tip;
    const screenStyle = this.props.navigation.state.params.screenType;

    return (
      <ScrollView style={styles.detail}>

        {screenStyle === "verified" &&
            <View style={styles.navBar}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("TipOverview")
              }
              style={styles.backButton}
            >
              <Text style={styles.headerText}>
                <FontAwesome name="chevron-left" size={20} color="white" />   TipOverview
              </Text>
            </TouchableOpacity>
          </View>
        }
        {screenStyle === "pending" &&
          <View style={styles.navBarPending}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("PendingTips", {tips: this.state.tips})}
            style={styles.backButton}
          >
            <Text style={styles.headerText}>
              <FontAwesome name="chevron-left" size={20} color="white" />  Pending Tips
            </Text>
          </TouchableOpacity>
        </View>
        }
        <View>
          <Text style={styles.title}>{this.state.tip.title}</Text>
          <View style={styles.tags}>
            <Tag key={this.state.tip.category} category={this.state.tip.category} />
          </View>
          <Text style={styles.content}>{this.state.tip.content}</Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="map-marker" size={17} /> Grainger
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="user" size={17} /> {this.state.username}
          </Text>
          <Text style={styles.postDetails}>
            {" "}
            <FontAwesome name="clock-o" size={17} /> {tip.posted_time}
          </Text>
        </View>

        {screenStyle === "pending" && (
          <View style={styles.verification}>
            <View style={styles.leftActionsVerif}>
              <TouchableOpacity style={styles.discardButton}>
                <Text style={styles.verifButtonText}>Discard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightActionsVerif}>
              <TouchableOpacity style={styles.approveButton}>
                <Text style={styles.verifButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screenStyle === "verified" && (
          <View style={styles.action}>
            <View style={styles.leftActions}>
              <Text style={styles.upvotes}>{this.state.upvotes}% Upvoted</Text>
            </View>
            <View style={styles.rightActions}>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="caret-up" size={30} color="#9A9A9A" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <FontAwesome name="caret-down" size={30} color="#9A9A9A" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    marginTop: 30,
    fontWeight: "500",
    fontSize: 25
  },
  upvotes: {
    margin: 8,
    fontSize: 17
  },
  detail: {
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  header: {
    marginBottom: 20
  },
  verifButtonText:{
    fontSize: 15,
    fontWeight:"500",
    color: "white"
  },
  action: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E6E6EB",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verification:{
    marginHorizontal: 20,
    marginTop: 40,
    borderRadius: 15,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftActions: {
    width: Dimensions.get("window").width - 145
  },
  rightActions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 95
  },
  leftActionsVerif: {
    width: Dimensions.get("window").width / 3,
  },
  rightActionsVerif: {
    width: Dimensions.get("window").width / 3
  },
  button: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "white"
  },

  content: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 17
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: "#9C9C9C",
    borderBottomWidth: 2
  },
  tip: {
    width: 50,
    height: 25,
    borderTopWidth: 0,
    color: "white",
    borderTopColor: "#c7c7cc"
  },
  postDetails: {
    paddingHorizontal: 20,
    fontSize: 17
  },
  discardButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius:10,
    backgroundColor: "#C03303",
    flexDirection:"row",
    justifyContent: "center",
  },
  approveButton: {
    paddingVertical: 10,
    borderRadius:10,
    paddingHorizontal: 20,
    backgroundColor: "#358F39",
    justifyContent: "center",
    flexDirection:"row",
  },
  navBar:{
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#9041AF",
    paddingBottom: 15,
    marginBottom:30
  },
  navBarPending:{
    paddingTop: 37,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    backgroundColor: "#C03303",
    paddingBottom: 15,
    marginBottom:30
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
});

export default TipDetailsScreen;
