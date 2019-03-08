import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import ButtonInterface from "../components/NavigationComponents/ButtonInterface";

class Tag extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
          <TouchableOpacity style={[styles.tag, {backgroundColor: this.props.color}]}>
            <Text style={styles.text}>{this.props.category}</Text>
          </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  tag: {
    minWidth: 50,
    maxWidth: 100,
    borderTopWidth: 0,
    borderTopColor: "#c7c7cc",
    padding: 8,
    alignItems: "center"
  },
  text: {
    color: "white"
  }
});

export default Tag;
