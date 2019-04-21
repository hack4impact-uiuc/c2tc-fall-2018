import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

class TipCategories extends React.Component {
  render() {
    return (
        <View style={styles.categories}>
            <View style={styles.backHeader}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("TipOverview")}
                    style={styles.backButton}
                >
                    <Text style={styles.backText}>
                        <FontAwesome name="chevron-left" size={20} color="white" /> Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("TipForm")}
                    style={styles.nextButton}
                >
                    <Text style={styles.nextText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.category, {marginRight: 10, backgroundColor: "#89054E"}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome name="shield" size={40} color="white" />
                            {"\n"}
                            Crimes
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.category,{backgroundColor: "#306918"}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome name="child" size={40} color="white" />
                            {"\n"}
                            Health
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={[styles.category, {marginRight: 10, backgroundColor: "#E75000"}]}>
                    <View style={styles.categoryView}>
                        <Text style={styles.categoryText}>
                            <FontAwesome name="bus" size={40} color="white" />
                            {"\n"}
                            Transportation
                        </Text>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.category, {backgroundColor: "#0B66C1"}]}>
                    <View style={styles.categoryView}>
                        
                        <Text style={styles.categoryText}>
                            <FontAwesome style={styles.categoryIcon} name="credit-card" size={40} color="white" />
                            {"\n"}
                            Financial
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    backButton: {
        paddingLeft: 20,
        width: Dimensions.get("window").width-60
    },
    nextText: {
        marginTop: 15,
        color: "white",
        fontSize: 17,
        fontWeight: "500"
    },
    backText: {
        marginTop: 15,
        color: "white",
        fontSize: 17
    },
    backHeader: {
        paddingTop:20,
        height:70,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#9042AF",
        marginBottom:10,
    },
    row: {
        flexDirection: "row",
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    category:{
        width: (Dimensions.get("window").width - 30)/2,
        height: (Dimensions.get("window").width - 100)/2,
        borderRadius: 10,
        // marginRight: 10,
        flexDirection: "row",
        justifyContent: "center",
    },
    categoryText:{
        color: "white",
        fontSize: 15,
        fontWeight: "500",
        textAlign: "center"
    },
    categoryView:{
        flexDirection: "column",
        justifyContent: "center"
    }
});

export default TipCategories;