import React, { Component } from 'react'
import { Text, View,StyleSheet,Platform,PermissionsAndroid, Dimensions } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

interface IProps{

}
interface IState{
  currentLatitude: number,
  currentLongitude: number,
  markers : any,
}
   
export class Maps extends Component<IProps,IState>{

  state : IState = {
                    currentLatitude: 0,
                    currentLongitude: 0,
                    markers:[],
                    }

        componentDidMount(): void {
          const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
              this.getOneTimeLocation();
            } else {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  this.getOneTimeLocation();
                } else {
                  console.log(Error)
                }
              } catch (err) {
                console.warn(err);
              }
            }
          };
        }

        getOneTimeLocation=()=>{
          Geolocation.getCurrentPosition((position)=>{
            // console.log(position)
              this.setState({
                currentLatitude:position.coords.latitude,
                currentLongitude:position.coords.longitude
              })
            },
          )
        }

        getRequiredPositions=(positionOb:{coordinate:{
                                            latitude:number,          longitude:number}})=>{

          const {coordinate} = positionOb
          console.log(coordinate)
          this.setState(p=>({markers : [...p.markers,coordinate]}))
          this.setState({
            currentLatitude:coordinate.latitude,
            currentLongitude:coordinate.longitude
          })
        }


  render() {
    console.log(this.state.markers)
    return (
      <View style={styles.mapcontainer}>
        <MapView  
        region={{
          latitude: this.state?.currentLatitude,
          longitude: this.state?.currentLongitude,
          latitudeDelta:0.0922,
          longitudeDelta:0.0421,
        }}
        zoomControlEnabled
        showsUserLocation={true}
        style={{width:'100%',height:'100%'}}
        provider={PROVIDER_GOOGLE}
         onRegionChange={this.getOneTimeLocation}
         onPress={e => this.getRequiredPositions(e.nativeEvent)}
         >
          
          <Marker draggable coordinate={{
            latitude:this.state.currentLatitude,
            longitude:this.state.currentLongitude,
          }}/>
        </MapView>
        </View>
    )
  }
}

export default Maps

const styles = StyleSheet.create({
  mapcontainer: {
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center',
  },
  
})
