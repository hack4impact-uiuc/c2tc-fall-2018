import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Appbar } from "react-native-paper";
import TipOverview from "../components/TipOverview"

class PendingTipScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        tips: this.props.navigation.getParam("tips", []),
    }
  }

  render() {
    return (
      <View style={styles.categories}>
        <View style={styles.header}>
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
        </View>
        {this.state.tips.map(tip => (
            <TipOverview
            key={tip._id}
            tip={tip}
            tips={this.state.tip}
            navigation={this.props.navigation}
            screenType="pending"
            />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  category: {
    width: (Dimensions.get("window").width - 30) / 2,
    height: (Dimensions.get("window").width - 100) / 2,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center"
  },
  categoryText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center"
  },
  categoryView: {
    flexDirection: "column",
    justifyContent: "center"
  },
  header: {
    marginBottom: 20
  },
  backButton: {
    marginRight: 0,
    paddingRight: 0
  },
  backHeader: {
    marginLeft: -10
  },
  nextHeader: {
    alignSelf: "flex-end"
  }
});

export default PendingTipScreen;
