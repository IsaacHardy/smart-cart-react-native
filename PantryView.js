"use strict";
import React, {Component, StyleSheet, Text, View, ListView, TouchableHighlight} from "react-native";
 
var PantryView = React.createClass({

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
            var data = {};
            var sections = [];
            var res = response;

            res.map((item) => {
              var section = item.category;
              if (sections.indexOf(section) === -1) {
                sections.push(section);
                data[section] = [];
              }
              data[section].push(item);
            });
            console.log(data, sections);
          

            this.setState({
              dataSource : this.state.dataSource.cloneWithRowsAndSections(data, sections),
              loaded     : true
            });
          })
          .done();
      
    },

    componentDidMount() {
      this.fetchData();
    },

    getInitialState() {

      return {
        loaded : false,
        dataSource : new ListView.DataSource({
          rowHasChanged           : (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged : (s1, s2) => s1 !== s2
        })
      }
    } , 

    render() {
      if (!this.state.loaded) {
        return this.renderLoadingView();
      }

      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderList}
          renderSectionHeader={this.renderSectionHeader}
          style={styles.listView}
        />
      );
    },

    renderSectionHeader(data, sections) {
      return (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{sections}</Text>
        </View>

      )
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

    renderList(rowData, sections, rowID) {    
      return (
        <TouchableHighlight>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <Text style={styles.pantryItem}>Name: {rowData.title}</Text>
            </View>
          </View>
        </TouchableHighlight>
      );
  },


 
});
 
var styles = StyleSheet.create({
    container: {
      padding: 10,
      // marginTop: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: "center",
      borderBottomWidth: 0.5,
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
      paddingTop: 0,
      marginTop: 65,
      backgroundColor: '#F5FCFF',
    },
    pantryItem: {
      textAlign: "center",
    },
});
 
module.exports = PantryView;