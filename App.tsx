import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createStackNavigator} from "@react-navigation/stack"
import Home from './src/components/Home';
import BottomTab from './src/components/BottomTab';
import Camera from './src/components/Camera';
import Maps from './src/components/Maps';
import Gallery from './src/components/Gallery';

const Stack = createStackNavigator()

export class App extends Component {
  render() {
    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="BottomTab" component={BottomTab}/>
            <Stack.Screen name="camera" component={Camera}/>
            <Stack.Screen name="maps" component={Maps}/>
            <Stack.Screen name="gallery" component={Gallery}/>
          </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
