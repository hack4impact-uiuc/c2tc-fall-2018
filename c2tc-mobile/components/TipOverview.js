import React from "react";
import {
  Text,
  View,
  StyleSheet
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { FontAwesome } from "@expo/vector-icons";
import Tag from "../components/Tag";
// import ButtonInterface from "../components/NavigationComponents/ButtonInterface";

class TipOverview extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Content style={{padding:10}}>
          <View style={{flexDirection: "row"}}>
            <Tag category={this.props.category} color="blue"/>
            <Tag category={"SECOND"} color="green"/>
          </View>
          <View style={{padding:10}}>
            <Title>{this.props.title}</Title>
          </View>
        </Card.Content>

        <Card.Actions>
          <View style={styles.leftContainer}>
            <Text><FontAwesome name="map-marker" size={15} /> {this.props.location } </Text>
            <Text><FontAwesome name="user" size={15} /> {this.props.author}</Text>
          </View>

          <View style={styles.rightContainer}>
            <Button><FontAwesome
              name="arrow-circle-up"
              size={32}
            /></Button>
            <Button><FontAwesome
              name="arrow-circle-down"
              size={32}
            /></Button>
          </View>
        </Card.Actions>

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  tipPreview: {
    fontSize: 25,
    color: "black",
    borderTopColor: "#c7c7cc"
  },
  categoryheader: {
    fontSize:20,
    width: 100,
    height: 25,
    borderTopWidth: 0,
    color: "green"
  },
  leftContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

export default TipOverview;
