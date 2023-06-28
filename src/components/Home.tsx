import React, { Component } from 'react'
import { Text, View ,PermissionsAndroid,Platform, Alert} from 'react-native'
import { RNCamera } from 'react-native-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
         if(Platform.OS === "android"){
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,{
                    title:'Example App Camera Permission',
                    message:'Example App needs access to your camera'
                },
            );
            if(granted === PermissionsAndroid.RESULTS.granted){
                this.proceed()
            }else{
                Alert.alert('Camera Permissions are Denied')
            }
         }else{
            this.proceed()
         }
    }

    render() {
    return (
        <View>
            <TouchableOpacity onPress={this.handleCameraScreen}>
                <Text>Go to Camerea</Text>
            </TouchableOpacity>
            <RNCamera captureAudio={false}/>
        </View>
    )
  }
}

export default Home
