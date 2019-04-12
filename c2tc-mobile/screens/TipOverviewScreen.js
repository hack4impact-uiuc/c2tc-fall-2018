import React from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight
} from "react-native";
import TipOverview from "../components/TipOverview";
import TabBar from "../components/NavigationComponents/Tabs";
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
      user: "Philip",
      currentdate: "Thursday Feb 28",
      screenType: "verification",
      tips: []
    };
  }

  async componentDidMount() {
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

  onComponentFocused = async () => {
    if (this.state.screenType === "view") {
      let tipsResponse = await API.getVerifiedTips();
      this.setState({ tips: tipsResponse });
    } else if (this.state.screenType === "verification"){
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
    const screenStyle=this.state.screenType;
    if (this.props.page !== "tips") {
      return this.props.navigation.navigate("Map");
    }
    return (
      <ScrollView style={styles.tipOverview}>
        <NavigationEvents onDidFocus={this.onComponentFocused} />
        { screenStyle === "view" &&
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
          {/* <Text style={styles.headertext}>{this.state.user}!</Text> */}
        </View>
        }
        { screenStyle === "verification" &&
        <View style={styles.header}>
          <Text>All Pending Tips</Text>
        </View>
        }
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TipForm")}
          >
            <Text style={styles.button}> Submit A Tip ></Text>
          </TouchableOpacity>
          { screenStyle === "view" &&
          <TouchableOpacity
            onPress={() => this.setState({screenType: "verification"})}>
            <Text style={styles.button}> Review Pending Tips </Text>
          </TouchableOpacity> }
          { screenStyle === "verification" &&
          <TouchableOpacity
            onPress={() => this.setState({screenType: "view"})}>
            <Text style={styles.button}> View Verified Tips </Text>
          </TouchableOpacity> }
          {this.state.tips.map(tip => (
            <TipOverview
              key={tip._id}
              tip={tip}
              navigation={this.props.navigation}
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tipOverview: {
    backgroundColor: "#81573D"
  },
  content: {
    paddingHorizontal: 35
  },
  date: {
    color: "white"
  },
  header: {
    padding: 35,
    paddingTop: 60,
    paddingBottom: 100
  },
  header_right: {
    // padding: 35,
    // paddingTop: 60,
    // paddingBottom: 100
  },
  headertext: {
    fontSize: 27,
    fontWeight: "400",
    color: "white",
    borderTopColor: "#c7c7cc"
  },
  button: {
    padding: 10,
    fontSize: 18,
    color: "white"
  }
});

export default connect(
  mapStateToProps,
  null
)(TipOverviewScreen);
