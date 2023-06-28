import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Home from './src/components/Home';
import Camera from './src/components/Camera';

const Stack = createStackNavigator()

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" component={Home}/>
          <Stack.Screen name="camera" component={Camera}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
