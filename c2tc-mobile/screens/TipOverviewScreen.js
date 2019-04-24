import React from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import TipOverview from "../components/TipOverview";
import API from "../components/API";
import { NavigationEvents } from "react-navigation";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    page: state.page
  };
};

class TipOverviewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location",
      user: "",
      currentdate: "Thursday Feb 28",
      screenType: "view",
      tips: [],
      hasLoaded: false
    };
  }

  async componentWillMount() {
    if (this.state.screenType === "view") {
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    } else if (this.state.screenType === "verification") {
      let tipsResponse = await API.getPendingTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    } else {
      let tipsResponse = await API.getTips();
      this.setState({ tips: tipsResponse, hasLoaded: true });
    }
  }

  onComponentFocused = async () => {
    if (this.state.hasLoaded) {
      if (this.state.screenType === "view") {
        let tipsResponse = await API.getVerifiedTips();
        this.setState({ tips: tipsResponse });
      } else if (this.state.screenType === "verification") {
        let tipsResponse = await API.getPendingTips();
        this.setState({ tips: tipsResponse });
      } else {
        let tipsResponse = await API.getTips();
        this.setState({ tips: tipsResponse });
      }
    }
  };

  onChangeScreenType = async () => {
    if (this.state.screenType === "view") {
      this.state.screenType = "verification";
    } else {
      this.state.screenType = "view";
    }
    if (this.state.screenType === "view") {
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse });
    } else if (this.state.screenType === "verification") {
      let tipsResponse = await API.getPendingTips();
      this.setState({ tips: tipsResponse });
    } else {
      let tipsResponse = await API.getTips();
      this.setState({ tips: tipsResponse });
    }
  };

  profilePicPressed = () => {
    this.props.navigation.navigate("Profile");
  };

  render() {
    const screenStyle = this.state.screenType;
    if (this.props.page !== "tips") {
      return this.props.navigation.navigate("Map");
    }
    return (
      <View>
        <Image
          style={styles.backgroundImg}
          source={require("../assets/images/bg.png")}
        />
        <ScrollView style={styles.tipOverview}>
          <NavigationEvents onDidFocus={this.onComponentFocused} />
          {screenStyle === "view" && (
            <View style={styles.header}>
              <Text style={styles.date}>
                {this.state.currentdate.toUpperCase()}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.headertext,
                    {
                      alignSelf: "flex-start",
                      width: Dimensions.get("window").width - 104
                    }
                  ]}
                >
                  Good Evening,{"\n"}
                  {this.state.user}
                </Text>
                <TouchableOpacity onPress={this.profilePicPressed}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 50 / 2,
                      alignSelf: "flex-end"
                    }}
                    source={{
                      uri:
                        "https://facebook.github.io/react-native/docs/assets/favicon.png"
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {screenStyle === "verification" && (
            <View style={styles.header}>
              <Text>All Pending Tips</Text>
            </View>
          )}
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TipCategories")}
            >
              <Text style={styles.button}>Submit A Tip</Text>
            </TouchableOpacity>
            {screenStyle === "view" && (
              <TouchableOpacity onPress={this.onChangeScreenType}>
                <Text style={styles.button}>Review Pending Tips</Text>
              </TouchableOpacity>
            )}
            {screenStyle === "verification" && (
              <TouchableOpacity onPress={this.onChangeScreenType}>
                <Text style={styles.button}>View Verified Tips</Text>
              </TouchableOpacity>
            )}
            {this.state.tips.map(tip => (
              <TipOverview
                key={tip._id}
                tip={tip}
                navigation={this.props.navigation}
                screenType={this.state.screenType}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImg: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  tipOverview: {
    marginBottom: 76
  },
  content: {
    paddingHorizontal: 22
  },
  date: {
    color: "white",
    fontWeight: "500",
    opacity: 0.85,
    paddingTop: 6
  },
  header: {
    padding: 30,
    paddingTop: 60,
    paddingBottom: 100
  },
  headertext: {
    fontSize: 30,
    paddingTop: 4,
    fontWeight: "600",
    color: "white",
    borderTopColor: "#c7c7cc",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 7
  },
  button: {
    paddingBottom: 16,
    paddingLeft: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 7
  }
});

export default connect(
  mapStateToProps,
  null
)(TipOverviewScreen);
