import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions
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
      <View style={styles.detail}>

        <View style={styles.header}>
          {screenStyle === "verified" &&
            <Appbar.Header>
              <Appbar.BackAction
                style={styles.backButton}
                onPress={() => this.props.navigation.navigate("TipOverview")}
                style={styles.backButton}
              />
              <Appbar.Content
                titleStyle={styles.backHeader}
                title="Tip Overview"
                onPress={() => this.props.navigation.navigate("TipOverview")}
                style={styles.backButton}
              />
            </Appbar.Header>
          }
          {screenStyle === "pending" &&
            <Appbar.Header>
              <Appbar.BackAction
                style={styles.backButton}
                onPress={() => this.props.navigation.navigate("PendingTips", {tips: this.state.tips})}
                style={styles.backButton}
              />
              <Appbar.Content
                titleStyle={styles.backHeader}
                title="PendingTips"
                onPress={() => this.props.navigation.navigate("PendingTips", {tips: this.state.tips})}
                style={styles.backButton}
              />
            </Appbar.Header>
          }
        </View>
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
          <View style={styles.action}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  },
  uploadButton: {
    marginRight: 20
  },
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
  action: {
    marginHorizontal: 20,
    marginTop: 15,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#E6E6EB",
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
    width: Dimensions.get("window").width / 3
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
    backgroundColor: "red",
    justifyContent: "center"
  },
  approveButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "green",
    justifyContent: "center"
  },
  verifButtonText: {
    color: "white"
  }
});

export default TipDetailsScreen;
