import React, { Component } from 'react'
import { Button } from 'react-native'

export default class CurrentLocationButton extends Component {
  constructor(props) {
    super(props);
  }   

   handlePress() {
      this.props.changeLocation();
   }

    render() {
        return (
            <Button
               onPress = {this.props.changeLocation}
               title = "Red button!"
               color = "red"
            />
         );
    }
}
