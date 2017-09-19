/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import ListView from './View/waterListView';


export default class collectionTest extends Component {

  constructor() {
    super();

    this.state = {

      selectedTab: "home"

    };

  }

  render() {

    return (

      <View>
      <TabNavigator>

      <TabNavigator.item 
      title = "商城" 
      tabBarStyle = { {height: 49} } 
      onPress = { () => this.setState({selectedTab: "home"}) }
      >
      </TabNavigator.item>

      </TabNavigator>
      </View>
    )

  }

}


AppRegistry.registerComponent('collectionTest', () => ListView);
