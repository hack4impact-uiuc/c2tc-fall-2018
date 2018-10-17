import React from "react";

import {
  AppRegistry,
  Text,
  View,
  Dimensions,
  Image,
  Animated
} from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";
import ButtonInterface from "./ButtonInterface";

const { height } = Dimensions.get("window");

export default class Panel extends React.Component {
  static defaultProps = {
    draggableRange: {
      top: height / 1.75,
      bottom: 120
    }
  };

  draggedValue = new Animated.Value(-120);

  constructor(props) {
    super(props);
    this.state = {
      toggleLayerList: []
    };
  }

  getLayerTypes() {
    return this.state.toggleLayerList;
  }

  // var ButtonInterface = React.createClass({
  //   render: function () {
  //     return <button onClick={this.props.onClick}>{this.props.type}</button>;
  //   },
  // });

  updateLayerList() {
    this.state.toggleLayerList.push(this.props.type);
  }

  render() {
    return (
      <SlidingUpPanel
        visible
        startCollapsed
        showBackdrop={false}
        ref={c => (this._panel = c)}
        draggableRange={this.props.draggableRange}
        onDrag={v => this.draggedValue.setValue(v)}
      >
        <View style={styles.panel}>
          <ButtonInterface
            onClick={this.updateLayerList}
            type="Police"
            ref="button"
          />
        </View>
      </SlidingUpPanel>
    );
  }
}

const styles = {
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    opacity: 0.7
  }
};
