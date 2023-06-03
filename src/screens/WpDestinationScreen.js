import React,{useRef,useContext,useState} from 'react'
import { StyleSheet, Text, View,Dimensions,TouchableOpacity,} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Avatar,Icon} from 'react-native-elements';
import { colors,parameters } from '../global/styles'
import { GOOGLE_MAPS_APIKEY } from "@env";
import { URL } from "@env";
import { OriginContext,DestinationContext,WaypointContext,UserNameAndTime } from '../contexts/contexts';
import axios from 'axios';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

navigator.geolocation = require('react-native-geolocation-service')

const DestinationScreen = ({navigation}) => {

    const {origin,dispatchOrigin} = useContext(OriginContext)
    const {destination,dispatchDestination} = useContext(DestinationContext)
    const {dispatchWaypoint} = useContext(WaypointContext)
    const {User,dispatchUser} = useContext(UserNameAndTime)


    const textInput1 = useRef(4);
    const textInput2 = useRef(5);

    const[destinationflag,setDestination] = useState(false)
    const[waypoints,setwaypoints] = useState(false)
    return (
        <>
            <View style = {styles.view2}>
                <View style ={styles.view1}> 
                    <Icon 
                        type ="material-community"
                        name ="arrow-left"
                        color ={colors.grey1}
                        size ={32}
                        onPress ={()=>navigation.goBack()} 
                    />
                </View>
                <TouchableOpacity>
                    <View style ={{top:25,alignItems:"center"}}>
                        <View style ={styles.view3}>
                            <Avatar 
                                rounded
                                avatarStyle ={{}}
                                size ={30}
                                source = {require('../../assets/blankProfilePic.jpg')}
                                />
                            <Text style ={{marginLeft:5}}>For Someone</Text>
                            <Icon 
                                type ="material-community"
                                name ="chevron-down"
                                color ={colors.grey1}
                                size ={26}
                                />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {destinationflag === false &&
            <GooglePlacesAutocomplete 
                nearbyPlacesAPI = 'GooglePlacesSearch'
                placeholder ="From..."
                listViewDisplayed = "auto"
                debounce ={400}
                currentLocation ={true}
                currentLocationLabel='Current location'
                ref ={textInput1}
                minLength ={2}
                enablePoweredByContainer = {false}
                fetchDetails ={true}
                autoFocus ={true}
                styles = {autoComplete}
                query ={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:"en"
                }}


                onPress= {(data,details = null)=>{
                    dispatchOrigin({type:"ADD_ORIGIN",payload:{
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng,
                        address:details.formatted_address,
                        name:details.name
                    }})

                    setDestination(true)
                }}

            />
            }
            {destinationflag === true && waypoints===false &&
            <GooglePlacesAutocomplete 
                nearbyPlacesAPI = 'GooglePlacesSearch'
                placeholder ="Going to..."
                listViewDisplayed = "auto"
                debounce ={400}
                currentLocation ={true}
                currentLocationLabel='Current location'
                ref ={textInput2}
                minLength ={2}
                enablePoweredByContainer = {false}
                fetchDetails ={true}
                autoFocus ={true}
                styles = {autoComplete}
                query ={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:"en"
                }}

                onPress= {(data,details = null)=>{
                    dispatchDestination({type:"ADD_DESTINATION",payload:{
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng,
                        address:details.formatted_address,
                        name:details.name
                    }})
                    setwaypoints(true)

                    }}

            />
            }
            {waypoints === true &&
            <GooglePlacesAutocomplete 
                nearbyPlacesAPI = 'GooglePlacesSearch'
                placeholder ="Going to..."
                listViewDisplayed = "auto"
                debounce ={400}
                currentLocation ={true}
                currentLocationLabel='Current location'
                ref ={textInput2}
                minLength ={2}
                enablePoweredByContainer = {false}
                fetchDetails ={true}
                autoFocus ={true}
                styles = {autoComplete}
                query ={{
                    key:GOOGLE_MAPS_APIKEY,
                    language:"en"
                }}

                onPress= {(data,details = null)=>{
                    dispatchWaypoint({type:"ADD_WAYPOINT",payload:{
                        latitude:details.geometry.location.lat,
                        longitude:details.geometry.location.lng,
                        address:details.formatted_address,
                        name:details.name
                    }})

                    axios.post(URL + '/DRIVER', {
                        name: User.name,
                        time: User.time,                        
                        origin_address: origin.address,
                        origin_latitude: origin.latitude,
                        origin_longitude: origin.longitude,
                        destination_address: destination.formatted_address,
                        destination_latitude: destination.latitude,
                        destination_longitude: destination.longitude,
                        waypoint_address: details.formatted_address,
                        waypoint_latitude: details.geometry.location.lat,
                        waypoint_longitude: details.geometry.location.lng
                    })
                        .then(response => {
                            console.log(response.data);
                        })
                        .catch(error => {
                            console.error(error);
                        });

                    navigation.navigate("MatchScreen",{state:0})
                }}

            />
            }
        </>
    )
}

export default DestinationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:parameters.statusBarHeight
    },
    
    view1:{
      position:"absolute",
      top:25,
      left:12,
      backgroundColor:colors.white,
      height:40,
      width:40,
      borderRadius:20,
      justifyContent:"center",
      alignItems:"center",
      marginTop:2, 
      zIndex: 10
      
    },
    
    view3:{
      flexDirection:"row",
      alignItems:"center",
      marginTop:2,   
      marginBottom:10,
      backgroundColor: colors.white,
      height:30,
      zIndex: 10
    },
    
    view2:{backgroundColor:colors.white,
          zIndex:4,
          paddingBottom:10,
          
        },
    
        view24:{
          flexDirection:"row",
          justifyContent:"space-between",
         marginVertical:15,
          paddingHorizontal:20   
      }, 
      
      view25:{
          flexDirection:'row',
         alignItems:"baseline"
      },
      
      flatlist:{
          marginTop:20,
          zIndex:17,
          elevation:8
      },    
    
    });
    
    
    const autoComplete = {
    
        textInput:{
            backgroundColor: colors.grey6,
            height: 50,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
            borderWidth:1,
            marginHorizontal:15,
        },
        container: {
           paddingTop:20,
          flex: 1,
          backgroundColor:colors.white
              },
      
        textInputContainer: {
          flexDirection: 'row',
        },
  
  }
  