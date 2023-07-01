import React, { Component } from 'react'
import { Text, View,Image,StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconCamera from 'react-native-vector-icons/Entypo';


interface IProps{
    navigation:{
        push:(arg:string)=>void;
    }
}
 interface IState{
    images:any,
    isDisplay : boolean
 }

export class Gallery extends Component<IProps,IState> {

    state:IState = {images:[],isDisplay:false}

    getAsyncData=async()=>{
        try{
            const storedData = await AsyncStorage.getItem("imageUrl")
            if(storedData !== null){
                const parsedData = await JSON.parse(storedData)
                this.setState({images:parsedData})
            }else{
                this.setState({isDisplay : true})
            }
        }catch{
            console.log(Error)
        }
    }

    componentDidMount(): void {
        this.getAsyncData()
    }

    deleteAllImages=()=>{
        AsyncStorage.removeItem('imageUrl')
        this.props.navigation.push("BottomTab")

    }

  render() {
    console.log(this.state.images)
    return (
      <View style={styles.galleryCont}>
        {this.state.isDisplay ? (
            <View>
                <Text style={styles.deleteButtonText}>No images Yet</Text>
                <TouchableOpacity style={styles.deleteButton}>
                    <View style={{flexDirection:'row',alignItems:'center',}}>
                        <IconCamera name="camera" size={30} color={"#fff"} />
                        <Text style={[styles.deleteButtonText,styles.textWhite]}>Camerea</Text>
                    </View>
                </TouchableOpacity>
            </View>
        ):(
            <View>
                {this.state.images.map((eachImage:{uri:string}) => (
                    <View key={eachImage.uri} style={{flexDirection:'row',margin:10,}}>
                        <Image source={{uri:`${eachImage.uri}`}} width={100} height={100}/>
                    </View>
                ))}
                <View style={styles.buttonCont}>
                    <TouchableOpacity onPress={this.deleteAllImages} style={styles.deleteButton}>
                        <Text style={[styles.deleteButtonText,styles.textWhite]}>Delete All Images</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
      </View>
    )
  }
}

export default Gallery

const styles = StyleSheet.create({

    buttonCont:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        
    },

    galleryCont:{
       
    },

    textWhite:{
        color:'#fff',
        marginLeft:10,
    },

    deleteButtonText:{
        fontFamily:'Roboto',
        fontSize:20,
        color:'#000',
        fontWeight:'500'
    },

    deleteButton:{
        borderRadius:10,
        backgroundColor:'#901',
        padding:15,
    },
})
