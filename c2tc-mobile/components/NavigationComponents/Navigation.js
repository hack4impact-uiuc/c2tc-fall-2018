import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";

import API from "../API";
import SlidingUpPanel from "rn-sliding-up-panel";
import ButtonInterface from "./ButtonInterface";
import PhoneButton from "./PhoneButtonInterface";
import Tabs from "react-native-tabs";

const { height } = Dimensions.get("window");
const draggableRange = {
  top: height / 1.75,
  bottom: 120
};

export default class Navigation extends Component {
  draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
    this.state = {
      toggleLayerList: [],
      page: "filter"
    };
  }

  async componentDidMount() {
    console.log(API.getBusStops());
  }

  getLayerTypes() {
    var list = this.state.toggleLayerList;
    return list;
  }

  updateLayerList = type => {
    var list = this.state.toggleLayerList;
    var listLength = list.length;

    var isContaining = false;
    for (i = 0; i < listLength; i++) {
      if (list[i] == type) {
        isContaining = true;
        break;
      }
    }

    if (!isContaining) {
      this.state.toggleLayerList.push(type);
    }
  };

  setRef = reference => {
    this._panel = reference;
  };

  setDrag = velocity => {
    this.draggedValue.setValue(velocity);
  };

  getPage() {
    return this.state.page;
  }

  _onSelect = tab => {
    this.setState({ page: tab.props.name });
  };

  render() {
    let filter = this.state.page === "filter";
    return (
      <React.Fragment>
        <SlidingUpPanel
          visible
          startCollapsed
          showBackdrop={false}
          ref={this.setRef}
          draggableRange={draggableRange}
          onDrag={this.setDrag}
        >
          {filter ? (
            <View style={styles.panel}>
              <ButtonInterface type="busStop" ref="button" parentPanel={this} />
              <ButtonInterface type="crime" ref="button" parentPanel={this} />
              <ButtonInterface
                type="business"
                ref="button"
                parentPanel={this}
              />
              <ButtonInterface
                type="emergency"
                ref="button"
                parentPanel={this}
              />
            </View>
          ) : (
            <View style={styles.panel}>
              <PhoneButton
                type="Call SafeRides"
                ref="button"
                number="2172657433"
              />
              <PhoneButton
                type="Call SafeWalks"
                ref="button"
                number="2173331216"
              />
            </View>
          )}
        </SlidingUpPanel>
        <Tabs
          selected={this.state.page}
          style={styles.background}
          selectedStyle={{ color: "purple" }}
          onSelect={tab => this._onSelect(tab)}
        >
          <Text name="filter" selectedIconStyle={styles.tab}>
            Filters
          </Text>
          <Text name="contact" selectedIconStyle={styles.tab}>
            Contacts
          </Text>
        </Tabs>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    opacity: 0.7
  },
  background: {
    backgroundColor: "white",
    opacity: 0.5
  },
  tab: {
    borderTopWidth: 2,
    borderTopColor: "purple"
  }
});
