import React, { Component } from 'react'
import { Text, View,StyleSheet,Platform,PermissionsAndroid } from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

interface IProps{

}
interface IState{
  currentLongitute : string,
  currentLatitute : string,
  locationStatus : string,
  mapRegion : {
    latitude: number,
    longitude : number,
    latitudeDelta : number,
    longitudeDelta : number,
  },
  markers : any,
}

let watchID: number;

export class Maps extends Component<IProps,IState>{

  state : IState = {currentLongitute : '',
                    currentLatitute : '',
                    locationStatus : '',
                    markers:[],
                    mapRegion:{
                            latitude: 17.437462,
                            longitude: 78.491684,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                          }}

        componentDidMount(): void {
          const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
              this.getOneTimeLocation();
              this.subscribeLocationLocation();
            } else {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Location Access Required',
                    message: 'This App needs to Access your location',
                  },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  //To Check, If Permission is granted
                  this.getOneTimeLocation();
                  this.subscribeLocationLocation();
                } else {
                  this.setState({locationStatus : 'Permission Denied'});
                }
              } catch (err) {
                console.warn(err);
              }
            }
          };
          requestLocationPermission();
            return Geolocation.clearWatch(watchID)
        }

        getOneTimeLocation=()=>{
          Geolocation.getCurrentPosition((position)=>{

              const longitute = JSON.stringify(position.coords.longitude)
              const latitute = JSON.stringify(position.coords.latitude)

              this.setState({currentLatitute:latitute,currentLongitute:longitute})
            },
            (error)=>{
              this.setState({locationStatus:error.message})
            },
            {
              enableHighAccuracy:false,
              timeout:30000,
              maximumAge:1000,
            },
          )
        }

        subscribeLocationLocation=()=>{
          watchID = Geolocation.watchPosition((position)=>{
            this.setState({locationStatus:'You are here'})
            console.log(position)
            
            const latitude = JSON.stringify(position.coords.latitude)
            const longitude = JSON.stringify(position.coords.longitude)

            this.setState({currentLatitute:latitude,currentLongitute:longitude})
          },
            (error) =>{
              this.setState({locationStatus:error.message})
            },{
              enableHighAccuracy:false,
              maximumAge:1000
            }
          )
        }


//  onRegionChange=(region:{
//   latitude: number,
//     longitude : number,
//     latitudeDelta : number,
//     longitudeDelta : number,
//  })=>{
//     this.setState({mapRegion:region})
//  }


  render() {
    const {currentLatitute,currentLongitute} = this.state
    return (
      <View style={styles.mapcontainer}>
        <MapView
            // region={this.state.mapRegion}
            // provider={PROVIDER_GOOGLE}
          // onRegionChange={()=>this.onRegionChange(this.state.mapRegion)}
            // initialRegion={{
            //   latitude: parseInt(currentLatitute),
            //   longitude: parseInt(currentLongitute),
            //   latitudeDelta: 0.0922,
            //   longitudeDelta: 0.0421,
            // }}
            style={{height:"100%",width:"100%"}}
            showsUserLocation={true} >
            <Marker coordinate={this.state.mapRegion}  />
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
