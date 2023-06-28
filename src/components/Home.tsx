import React, { Component } from 'react'
import { Text, View ,PermissionsAndroid, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {check, RESULTS,PERMISSIONS } from 'react-native-permissions';

interface IProps{
    navigation?:{
        navigate:(arg:string)=>void
    }
}


export class Home extends Component<IProps> {

    proceed=()=>{
        Alert.alert('You can use the camera')
        this.props.navigation?.navigate('camera')
    }

    handleCameraScreen=async()=>{
        check(PermissionsAndroid.PERMISSIONS.CAMERA)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              Alert.alert('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              Alert.alert('The permission has not been requested / is denied but requestable');
              break;
            case RESULTS.LIMITED:
                this.proceed()
                break;
            case RESULTS.GRANTED:
                this.proceed()
                break;
            case RESULTS.BLOCKED:
              Alert.alert('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch(() => {
          console.log(Error)
        });
    }

    render() {
    return (
        <View>
            <TouchableOpacity onPress={this.handleCameraScreen}>
                <Text>Go to Camerea</Text>
            </TouchableOpacity>
        </View>
    )
  }
}

export default Home

// check(PERMISSIONS.IOS.LOCATION_ALWAYS)
//   .then((result) => {
//     switch (result) {
//       case RESULTS.UNAVAILABLE:
//         console.log('This feature is not available (on this device / in this context)');
//         break;
//       case RESULTS.DENIED:
//         console.log('The permission has not been requested / is denied but requestable');
//         break;
//       case RESULTS.LIMITED:
//         console.log('The permission is limited: some actions are possible');
//         break;
//       case RESULTS.GRANTED:
//         console.log('The permission is granted');
//         break;
//       case RESULTS.BLOCKED:
//         console.log('The permission is denied and not requestable anymore');
//         break;
//     }
//   })
//   .catch((error) => {
//     // …
//   });
