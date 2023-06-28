import React, { Component } from 'react'
import { Text, View } from 'react-native'

interface IProps{
    navigation:{
        navigate:(arg:string)=>void
    }
}

export class Camera extends Component {
  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default Camera
