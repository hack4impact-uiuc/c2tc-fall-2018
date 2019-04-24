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

class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 87,
      username: "",
      votestatus: ""
    };
  }

  async componentDidMount() {
    let author = await API.getUser(
      this.props.navigation.state.params.tip.author
    );
    //console.log(author);
    let username = author.username;
    if (author.anon) {
      username = "Anonymous";
    }

    let votestatus = ""
    let upvotedUsers = await API.getUserDownvotes(this.props.navigation.state.params.tip._id);
    console.log(upvotedUsers);

    // if (upvotedUsers.includes(author._id)) {
    //   votestatus = "UPVOTE";
    // } else {
    //   let downvotedUsers = await API.getUserDownvotes(this.props.navigation.state.params.tip._id);
    //   if (downvotedUsers["users"].includes(author._id)) {
    //     votestatus = "DOWNVOTE";
    //   }
    // }

    this.setState({
      username,
      votestatus
    });
  }

  approvePress = async () => {
    let data = {
      id: this.props.navigation.state.params.tip._id,
      status: "verified"
    }
    let response = await API.updateStatus(this.props.navigation.state.params.tip._id, data);
    this.props.navigation.navigate("TipOverview");
  }

  discardPress = async () => {
    let data = {
      id: this.props.navigation.state.params.tip._id,
      status: "denied"
    }
    let response = await API.updateStatus(this.props.navigation.state.params.tip._id, data);
    this.props.navigation.navigate("TipOverview");
  }

  upvotePress = async () => {
    let data = {
      tips_id: this.props.navigation.state.params.tip._id,
      vote_type: "UPVOTE"
    }
    let response = await API.voteTip(this.props.navigation.state.params.tip._id, data);
  }

  downvotePress = async () => {
    let data = {
      tips_id: this.props.navigation.state.params.tip._id,
      vote_type: "DOWNVOTE"
    }
    let response = await API.voteTip(this.props.navigation.state.params.tip._id, data);
  }

  render() {
    let tip = this.props.navigation.state.params.tip;
    const screenStyle = this.props.navigation.state.params.screenType;

    return (
      <View style={styles.detail}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipOverview")}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              <FontAwesome name="chevron-left" size={20} color="#027BFF" /> Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipForm")}
            style={styles.uploadButton}
          >
            <FontAwesome name="upload" size={20} color="#027BFF" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>{tip.title}</Text>
          <View style={styles.tags}>
            <Tag key={tip.category} category={tip.category} />
          </View>
          <Text style={styles.content}>{tip.content}</Text>
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

        {screenStyle === "verification" && (
          <View style={styles.action}>
            <View style={styles.leftActionsVerif}>
              <TouchableOpacity style={styles.discardButton} onPress={this.discardPress}>
                <Text style={styles.verifButtonText}>Discard</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightActionsVerif}>
              <TouchableOpacity style={styles.approveButton} onPress={this.approvePress}>
                <Text style={styles.verifButtonText}>Approve</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {screenStyle === "view" && (
          <View style={styles.action}>
            <View style={styles.leftActions}>
              <Text style={styles.upvotes}>{this.state.upvotes}% Upvoted</Text>
            </View>
            <View style={styles.rightActions}>
              {this.state.votestatus == "UPVOTE" &&
                <TouchableOpacity style={styles.upvotedButton} onPress={this.upvotePress}>
                  <FontAwesome name="caret-up" size={30} color="#9A9A9A" />
                </TouchableOpacity>
              }
              {this.state.votestatus != "UPVOTE" &&
                <TouchableOpacity style={styles.button} onPress={this.upvotePress}>
                  <FontAwesome name="caret-up" size={30} color="#9A9A9A" />
                </TouchableOpacity>
              }

              {this.state.votestatus == "DOWNVOTE" &&
                <TouchableOpacity style={styles.downvotedButton} onPress={this.downvotePress}>
                  <FontAwesome name="caret-down" size={30} color="#9A9A9A" />
                </TouchableOpacity>
              }
              {this.state.votestatus != "DOWNVOTE" &&
                <TouchableOpacity style={styles.button} onPress={this.downvotePress}>
                  <FontAwesome name="caret-down" size={30} color="#9A9A9A" />
                </TouchableOpacity>
              }
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    paddingLeft: 20,
    width: Dimensions.get("window").width - 45
  },
  backText: {
    color: "#027BFF",
    fontSize: 20
  },
  uploadButton: {
    marginRight: 20
  },
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-start"
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
  upvotedButton: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "green"
  },
  downvotedButton: {
    alignItems: "center",
    height: 35,
    width: 35,
    margin: 5,
    borderRadius: 25,
    backgroundColor: "red"
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
