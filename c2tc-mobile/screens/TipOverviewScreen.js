import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ButtonInterface from "../components/NavigationComponents/ButtonInterface";
import TipOverview from "../components/TipOverview";
import Tag from "../components/Tag";
import { Appbar, Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

class TipOverviewScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "title",
      content: "content",
      author: "author",
      date: "date posted",
      location: "location",
      user: "User",
      currentdate: "January 4th, 2019"
    }
  }

  handleAddTipPress = e => {
    console.log("Add a Tip")
  }

  // componentDidMount() {
  //
  // }

  render() {
    return(
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headertext}>{this.state.currentdate}</Text>
          <Text style={styles.headertext}>Good morning, {this.state.user}!</Text>
        </View>
        <View>
          <TouchableOpacity
             onPress={this.handleAddTipPress}
           >
             <Text style={styles.button}> Add a Tip </Text>
           </TouchableOpacity>
          <TipOverview title="Wow there is so much information to be found here!" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus cursus massa nunc, vitae porttitor felis pulvinar at." category="safety" location="location" author="author"/>
          <TipOverview title="Wow there is so much information to be found here!" category="safety" location="location" author="author"/>
        </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    padding:35,
    paddingTop:60,
    paddingBottom:100
  },
  headertext: {
    fontSize: 25,
    color: "black",
    borderTopColor: "#c7c7cc"
  },
  button: {
    padding:10,
    fontSize:18,
    color: "black"
  }
});

export default TipOverviewScreen
