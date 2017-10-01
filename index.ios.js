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
import { StackNavigator } from 'react-navigation';

const BasicApp = StackNavigator({
  Main: {screen: ListView}
});

AppRegistry.registerComponent('collectionTest', () => BasicApp);
