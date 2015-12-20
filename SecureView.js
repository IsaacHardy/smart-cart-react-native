"use strict";
import React, {Component, StyleSheet, Text, View, ListView} from "react-native";
 
var SecureView = React.createClass({
 
    // constructor(props) {
    //     // super(props);
    //     this.state = {
    //         username: this.props.username,
    //         token: this.props.token
    //     };
      
    // },

    fetchData() {
      fetch('http://intense-refuge-9476.herokuapp.com/edible', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Token': this.props.token
          },
        }).then((res) => res.json())
          .then((response) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(response),
              loaded: true,
            });
            
          })
          .catch((error) => {
            console.warn(error);
          });
      
    },

    componentDidMount() {
      this.fetchData();
    },

    getInitialState() {
      return {
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        loaded: false,
      };
    } , 

    render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderList}
          style={styles.listView}
        />
      );
    },

    renderLoadingView() {
      return (
        <View style={styles.container}>
          <Text>
            Loading pantry...
          </Text>
        </View>
      );
    },

    renderList(item) {
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <Text style={styles.pantryItem}>Name: {item.title}</Text>
          <Text style={styles.pantryItem}>Category: {item.category}</Text>
        </View>
      </View>
    );
  },


 
});
 
var styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: "center",
        flex: 1
    },
    heading: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: "center",
        color: "#656565"
    },
    subheading: {
        color: "#cccccc"
    },
    listView: {
      paddingTop: 20,
      backgroundColor: '#F5FCFF',
    },
    pantryItem: {
      textAlign: "center",

    },
});
 
module.exports = SecureView;