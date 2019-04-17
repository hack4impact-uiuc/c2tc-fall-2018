import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

class TipCategories extends React.Component {
  render() {
    return (
        <View style={styles.backHeader}>
            <TouchableOpacity styles={{backgroundColor: "#89054E"}}>
                <FontAwesome name="shield" size={30} color="white" />
                Crimes
            </TouchableOpacity>
            <TouchableOpacity styles={{backgroundColor: "#306918"}}>
                <FontAwesome name="child" size={30} color="white" />
                Health
            </TouchableOpacity>
            <TouchableOpacity styles={{backgroundColor: "#E75000"}}>
                <FontAwesome name="bus" size={30} color="white" />
                Transportation
            </TouchableOpacity>
            <TouchableOpacity styles={{backgroundColor: "#0B66C1"}}>
                <FontAwesome name="credit-card" size={30} color="white" />
                Financial
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default withTheme(TipCategories);
