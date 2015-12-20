'use strict';
import React, {AppRegistry, StyleSheet, Text, View, NavigatorIOS} from "react-native";
import LoginView from "./LoginView";
import 'react-native-cookies';

const URL = 'http://intense-refuge-9476.herokuapp.com';

var SmartCartAPP = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
        title: "Login",
        component: LoginView,
      }} />
    );
  }   
});

var styles = StyleSheet.create({
    navigationContainer: {
        flex: 1
    }
});

AppRegistry.registerComponent('SmartCartAPP', () => SmartCartAPP);
