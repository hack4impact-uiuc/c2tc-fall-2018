import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Tag from "../components/Tag";

class TipOverview extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <TouchableOpacity onPress={ () => this.props.navigation.navigate("TipDetail", {tip:this.props.tip}) }style = {styles.card}>
        <View style = {styles.cardTitle}>
          <View style = {styles.tags}>
          {this.props.tags.map((tag) =>
            <Tag key={tag} category={tag} />
          )}
          </View>
          <Text style={styles.tipTitle}>{this.props.title}</Text>
        </View>
        <View style = {styles.cardActions}>
          <View style={styles.leftActions}>
            <Text style={styles.actionText}><FontAwesome name="map-marker" size={17} />   {this.props.location } </Text>
            <Text style={styles.actionText}><FontAwesome name="user" size={17} />   {this.props.author}</Text>
          </View>
          <View style={styles.rightActions}>
            <TouchableOpacity style = {styles.button} >
              <FontAwesome
                name="caret-up"
                size={30}
                color = "#9A9A9A"
              />
            </TouchableOpacity>
            <TouchableOpacity  style= {styles.button}>
              <FontAwesome
                name="caret-down"
                size={30}
                color = "#9A9A9A"
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    borderRadius: 15,
    marginVertical: 10
  },
  tags:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom:5
  },
  cardTitle:{
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding:20,
    backgroundColor: "white",
  },
  tipTitle:{
    fontSize: 20,
    fontWeight:"500"
  },  
  cardActions:{
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    padding:20,
    backgroundColor: "rgba(255,255,255,.7)",
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  leftActions:{
    width: Dimensions.get("window").width - 195
  },
  rightActions:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 95,
  },
  actionText:{
    fontSize: 17,
  },  
  button:{
    alignItems:"center",
    height:35,
    width:35,
    margin:5,
    borderRadius:25,
    backgroundColor:"white"
  }
});

export default TipOverview;
