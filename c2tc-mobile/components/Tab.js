import React, { Component } from "react";
import { Text } from "react-native";

import Tabs from "react-native-tabs";

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = { page: "filter" };
  }

  getState() {
    return this.state.page;
  }

  render() {
    return (
      <Tabs
        selected={this.state.page}
        style={{ backgroundColor: "white", opacity: 0.5 }}
        selectedStyle={{ color: "purple" }}
        onSelect={el => this.setState({ page: el.props.name })}
      >
        <Text
          name="filter"
          selectedIconStyle={{ borderTopWidth: 2, borderTopColor: "purple" }}
        >
          Filters
        </Text>
        <Text
          name="contact"
          selectedIconStyle={{ borderTopWidth: 2, borderTopColor: "purple" }}
        >
          Contacts
        </Text>
      </Tabs>
    );
  }
}
