import React, { Component } from 'react'
import { Text, View , Alert, StyleSheet} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {check, RESULTS,PERMISSIONS, openSettings } from 'react-native-permissions';

import IconCamera from 'react-native-vector-icons/Entypo';
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";

interface IProps{
    navigation?:{
        navigate:(arg:string)=>void;
        push:(arg:string)=>void;
    }
}


export class Home extends Component<IProps> {

    proceed=()=>{
        Alert.alert('You can use the camera')
        this.props.navigation?.navigate('camera')
    }

    handleCameraScreen=async()=>{
        check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              Alert.alert('This feature is not available (on this device / in this context)');
              break;
            case RESULTS.DENIED:
              openSettings()
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

    handleMapScreen=()=>{
      this.props.navigation?.navigate("maps")
    }

    handlegalleryScreen=()=>{
      this.props.navigation?.push("gallery")
    }

   
    render() {
    return (
        <View style={styles.homeCont}>
            <TouchableOpacity onPress={this.handleCameraScreen} style={styles.camera}>
              <View style={{flexDirection:'row',alignItems:'center',}}>
                <IconCamera name="camera" size={30} color={"#fff"} />
                <Text style={styles.cameraText}>Camerea</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.camera} onPress={this.handleMapScreen}>
              <View style={{flexDirection:'row',alignItems:'center',}}>
                <Feather name="map-pin" size={30} color={"#fff"}/>
                <Text style={styles.cameraText}>Maps</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.camera} onPress={this.handlegalleryScreen}>
              <View style={{flexDirection:'row',alignItems:'center',}}>
                <AntDesign name="picture" color={"#fff"} size={30}/>
                <Text style={styles.cameraText}>Gallery</Text>
              </View>
            </TouchableOpacity>
            
        </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({

  cameraText:{
    fontSize:22,
    fontFamily:'Roboto',
    fontWeight:'600',
    color:'#fff',
    marginLeft:10,
  },

  camera:{
    backgroundColor:'#901',
    padding:15,
    borderRadius:10,
  },
  homeCont:{
    flex:1,
    backgroundColor:'#355',
    justifyContent:'center',
    alignItems:'center',
    gap:10,
  },
})

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
