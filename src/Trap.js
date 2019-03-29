import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import SearchBar from './SearchBar';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      buttonText: 'click here'
    };
  }

  _showText = () => {
    if (this.state.visible === true){
      return (
          <Text style={styles.welcome}>Linh la vache!</Text>);
    } else {
      return null
    }
  }

  _toggle = () => {
    if (this.state.visible === false)
      this.setState({visible: true, buttonText: 'Huhuhu hide quickly, click !'})
    else
      this.setState({visible: false,  buttonText: 'Click here'})
  }


  render() {
    return (
      <View style={styles.container}>
          <SearchBar/>   
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text style={styles.welcome}>{this.state.buttonText}</Text>
          </TouchableOpacity>
          {this._showText()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10
  },
});