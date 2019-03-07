import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";
import Panel from "./Panel"
import TabBar from "./Tabs"
import { Provider, connect } from 'react-redux';
import {store} from "../../Redux"

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "filter"
    };
  }

  render() {
    return (
      <React.Fragment>
          <Panel />
          <TabBar/>
      </React.Fragment>
    );
  }
}

// const styles = StyleSheet.create({
//   panel: {
//     shadowColor: "black",
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     flex: 1,
//     flexDirection: "row",
//     backgroundColor: "white",
//     flexDirection: "column",
//     opacity: 1,
//     borderRadius: 10,
//     flexWrap: "wrap"
//   },
//   title: {
//     height: 20,
//     width: width,
//     flex: 1,
//     justifyContent: "center"
//   },
//   subtitle: {
//     fontSize: 15,
//     color: "#000000",
//     letterSpacing: 0.01,
//     lineHeight: 20,
//     textAlign: "left"
//   },
//   text: {
//     height: 5,
//     width: width,
//     flex: 1,
//     justifyContent: "center"
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 20,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   filter: {
//     borderRadius: 10,
//     width: width,
//     fontWeight: "700",
//     fontSize: 25,
//     padding: 15,
//     color: "black",
//     textAlign: "left",
//     position: "relative"
//   },
//   subtitle: {
//     borderRadius: 10,
//     width: width,
//     fontWeight: "700",
//     fontSize: 15,
//     padding: 15,
//     color: "black",
//     textAlign: "left",
//     position: "relative"
//   },
//   text: {
//     borderRadius: 10,
//     width: width,
//     fontWeight: "300",
//     fontSize: 10,
//     padding: 15,
//     color: "black",
//     textAlign: "left",
//     position: "relative"
//   },
//   tabbg: {
//     borderTopWidth: 0.5,
//     borderTopColor: "rgba(142,142,147,0.70)",
//     shadowColor: "black",
//     shadowOpacity: 0.15,
//     shadowRadius: 15,
//     backgroundColor: "white",
//     opacity: 1,
//     padding: 38
//   },
//   tab: {
//     borderTopWidth: 0,
//     borderTopColor: "#c7c7cc"
//   }
// });
