import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Camera from './Camera';
import Maps from './Maps';
import Gallery from './Gallery';

import IconCamera from 'react-native-vector-icons/Entypo';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator()


export class BottomTab extends Component {
  render() {
    return (
      <Tab.Navigator >
        <Tab.Screen options={{
            tabBarIcon:({color,size})=>(
                <Feather name="home" color={color} size={size}  />
            )
        }} name="home" component={Home}/>
        <Tab.Screen options={{
            tabBarIcon:({color,size})=>(
                <IconCamera name="camera" size={size} color={color}/>
            )
        }} name="Camera" component={Camera}/>
        <Tab.Screen options={{
            tabBarIcon:({color,size})=>(
                <Feather name="map-pin" size={size} color={color}/>
            )
        }} name="Maps" component={Maps}/>
        <Tab.Screen options={{
            tabBarIcon:({color,size})=>(
                <AntDesign name="picture" color={color} size={size}/>
            )
        }} name="Gallery" component={Gallery}/>
      </Tab.Navigator>
    )
  }
}

export default BottomTab
