"use strict";
 
import React, {StyleSheet, View, TouchableHighlight, Component, Text, TextInput} from 'react-native';
import PantryView from "./PantryView";
import 'react-native-cookies';

class LoginView extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
        username: "",
        password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Sign In
        </Text>
        <View>
          <TextInput
            placeholder="Username"
            onChange={(event) => this.setState({username: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.username} />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChange={(event) => this.setState({password: event.nativeEvent.text})}
            style={styles.formInput}
            value={this.state.password} />
          <TouchableHighlight onPress={(this.onSubmitPressed.bind(this))} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  onSubmitPressed() {

    fetch('http://intense-refuge-9476.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then((res) => res.json())
      .then((response) => {
        
        this.props.navigator.push({
          title: "Pantry List",
          component: PantryView,
          passProps: {username: response.user.username, token: response.user.access_token},
        });
      })
      .catch((error) => {
        console.warn(error);
      });

  }

  removeCookies(event) {
  
    let ajaxNull = $.ajaxSetup({
      headers: {
        auth_token: null
      }
    });
  }
 
};
 
var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: "stretch"
    },
    title: {
        fontSize: 18,
        marginBottom: 10
    },
    formInput: {
        height: 36,
        padding: 10,
        marginRight: 5,
        marginBottom: 5,
        marginTop: 5,
        flex: 1,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#555555",
        borderRadius: 8,
        color: "#555555"
    },
    button: {
        height: 36,
        flex: 1,
        backgroundColor: "#555555",
        borderColor: "#555555",
        borderWidth: 1,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 18,
        color: "#ffffff",
        alignSelf: "center"
    },
});
 
module.exports = LoginView;