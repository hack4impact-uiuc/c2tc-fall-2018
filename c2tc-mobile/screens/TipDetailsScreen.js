import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import ButtonInterface from "../components/NavigationComponents/ButtonInterface";
import Tag from "../components/Tag";

class TipDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location"
    }
  }

  // componentDidMount() {
  //
  // }

  render() {
    return(
      <View>
          <Text>{this.state.title}</Text>
          <Text>{this.state.content}</Text>
          <Text>{this.state.author}</Text>
          <Text>{this.state.date}</Text>
          <Text>{this.state.location}</Text>
          <Tag category="safety" color="blue"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tip: {
    width: 50,
    height: 25,
    borderTopWidth: 0,
    color: "white",
    borderTopColor: "#c7c7cc"
  }
});

export default TipDetailsScreen
