import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { TextInput, withTheme } from 'react-native-paper';

class TipForm extends React.Component {
  static title = 'TextInput';

  state = {
    tipTitle: '',
    tipBody: '',
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        keyboardVerticalOffset={80}
      >
        <ScrollView
          style={[styles.container, { backgroundColor: background }]}
          keyboardShouldPersistTaps={'always'}
          removeClippedSubviews={false}
        >


          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Tip Title"
            placeholder="Title of your tip"
            value={this.state.tipTitle}
            onChangeText={tipTitle => this.setState({ tipTitle })}
          />
          <TextInput
            mode="outlined"
            style={styles.inputContainerStyle}
            label="Tip Body"
            placeholder="Content of your tip"
            value={this.state.tipBody}
            onChangeText={tipBody => this.setState({ tipBody })}
          />

        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  wrapper: {
    flex: 1,
  },
  inputContainerStyle: {
    margin: 8,
  },
});

export default withTheme(TipForm);