import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/dist/FontAwesome";

import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps{

}
interface IState{
    takingPic:boolean,
    imageUri:any,
}

class Camera extends Component<IProps,IState> {

    state:IState = {takingPic:false,imageUri:[]}

    camera?: RNCamera | null
    

    takePicture = async () => {
        if (this.camera && !this.state.takingPic) {
    
          let options = {
            quality: 0.85,
            fixOrientation: true,
            forceUpOrientation: true,
          };
    
          this.setState({takingPic: true});
    
          try {
            const data = await this.camera.takePictureAsync(options);
            console.log(data)
            this.setState(p=>({imageUri:[...p.imageUri,data]}))
            await AsyncStorage.setItem("imageUrl",JSON.stringify(this.state.imageUri))

          } catch (err:any) {
            Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
            return;
          } finally {
            this.setState({takingPic: false});
          }
        }
      };

    render() {
      return (
        <View style={styles.container}>
          <RNCamera captureAudio={false}
            style={{ flex: 1, alignItems: 'center' }}
            ref={ref => {
              this.camera = ref
            }}
          />
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}} onPress={this.takePicture}>
            <Icon name="camera" size={50}color={"#fff"}></Icon>
          </TouchableOpacity>
          
        </View>
      )
    }
  }

  export default Camera
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black'
    }
  })
  