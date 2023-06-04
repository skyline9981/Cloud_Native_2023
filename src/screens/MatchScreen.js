import { StatusBar } from 'expo-status-bar'
import React,{useState,useRef,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,Dimensions ,ScrollView,Image,FlatList,TouchableOpacity} from 'react-native'
import { Icon} from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps'; 
import * as Location from 'expo-location';
import { OriginContext,DestinationContext,UserNameAndTime } from '../contexts/contexts';

const SCREEN_WIDTH = Dimensions.get('window').width
import { colors,parameters } from '../global/styles'
import { filterData,carsAround } from '../global/data'
import { mapStyle} from "../global/mapStyle"

const HomeScreen = ({navigation}) => {
const {User,dispatchUser} = useContext(UserNameAndTime)

const {origin,dispatchOrigin} = useContext(OriginContext)
const {destination,dispatchDestination} = useContext(DestinationContext)
const [latlng,setLatLng] = useState({})


const checkPermission =async()=>{
    const hasPermission = await Location.requestForegroundPermissionsAsync();
    if(hasPermission.status === 'granted') {
        const permission = await askPermission();
        return permission
    }
    return true
};


const askPermission = async()=>{
    const permission = await Location.requestForegroundPermissionsAsync()
    return permission.status === 'granted';
};


const getLocation = async()=>{
    try{
        const {granted} =await Location.requestForegroundPermissionsAsync();
        if(!granted)return;
        const {
            coords:{latitude,longitude},
        } = await Location.getCurrentPositionAsync();
        setLatLng({latitude:latitude,longitude:longitude})
    }catch(err){

    }
}

const [driverdata,setdriverdata] = useState({
    name: "",
    time: "",                        
    origin_address: "",
    origin_latitude: "",
    origin_longitude: "",
    destination_address: "",
    destination_latitude: "",
    destination_longitude: "",
    waypoints_address: "",
    waypoints_address_latitude:"",
    waypoints_address_longitude:""
})
const [cusdata,setcusdata] = useState({
    name: "",
    time: "",                        
    origin_address: "",
    origin_latitude: "",
    origin_longitude: "",
    destination_address: "",
    destination_latitude: "",
    destination_longitude: "",
    waypoints_address: "",
    waypoints_address_latitude:"",
    waypoints_address_longitude:""
})

const fetchDriverData = async () => {
    try {
        const response = await axios.get(URL +'/driver');
        setdriverdata({
            name: response.data.name,
            time: response.data.time,
            origin_address: response.data.origin_address,
            origin_latitude: response.data.origin_latitude,
            origin_longitude: response.data.origin_longitude,
            destination_address: response.data.destination_address,
            destination_latitude: response.data.destination_latitude,
            destination_longitude: response.data.destination_longitude,
            waypoints_address: response.data.waypoints_address,
            waypoints_address_latitude:response.data.waypoints_address_latitude,
            waypoints_address_longitude:response.data.waypoints_address_longitude
        });
        console.log(response.data.current_state);
    } catch (error) {
        console.error('Fail:', error);
    }
};
const fetchCustomerData = async () => {
    try {
        const response = await axios.get(URL +'/passenger');
        setcusdata({
            name: response.data.name,
            time: response.data.time,
            origin_address: response.data.origin_address,
            origin_latitude: response.data.origin_latitude,
            origin_longitude: response.data.origin_longitude,
            destination_address: response.data.destination_address,
            destination_latitude: response.data.destination_latitude,
            destination_longitude: response.data.destination_longitude,
            waypoints_address: response.data.waypoints_address,
            waypoints_address_latitude:response.data.waypoints_address_latitude,
            waypoints_address_longitude:response.data.waypoints_address_longitude
        });
        console.log(response.data.current_state);
    } catch (error) {
        console.error('Fail:', error);
    }
};
const _map = useRef(1);


useEffect(()=>{
    checkPermission();
    getLocation();
    console.log(User.name);
    fetchCustomerData();
    fetchDriverData()
},[])


    return (
        <View style ={styles.container}>
            
            <ScrollView bounces ={false}>
                <View style ={styles.home}>
                    <Text style = {styles.text1}>Match!!!</Text>
                    
                </View>

               
                    
               

                    <View style ={{...styles.view5,borderBottomWidth:0}}>
                        <View style ={styles.view6}>
                            <View style ={styles.view7}>
                                <Icon type = "material-community"
                                    name ="check-circle"
                                    color = {colors.black}
                                    size = {22}
                                />
                            </View>
                            <View>
                                <Text style ={{fontSize:18,color:colors.black}}>Name of Driver</Text>
                                <Text style ={{color:colors.grey3}}>Plate Number</Text>
                            </View>
                        </View>
                        <View>
                            <Icon type = "material-community"
                                        name ="chevron-right"
                                        color = {colors.grey}
                                        size = {26}
                                    />
                            </View>
                    </View>  

                    <Text style ={styles.text4}>Path</Text>

                    <View>
                <MapView
                    provider ={PROVIDER_GOOGLE}
                    style = {styles.map}
                    customMapStyle ={mapStyle}
                    ref = {this._map}
                        >                       
                     { driverdata.origin_latitude != null &&   
                        <Marker coordinate = {{latitude:driverdata.origin_latitude,longitude:driverdata.origin_longitude}} anchor = {{x:0.5,y:0.5}} >
                            <Image 
                                source ={require('../../assets/location.png')}
                                style ={styles.markerOrigin2}
                                resizeMode ="cover"
                            />
                        </Marker>
                     }
                     { driverdata.destination_latitude != null &&   
                        <Marker coordinate = {{latitude:driverdata.destination_latitude,longitude:driverdata.destination_longitude}} anchor = {{x:0.5,y:0.5}} >
                            <Image 
                                source ={require('../../assets/location.png')}
                                style ={styles.markerDestination}
                                resizeMode ="cover"
                            />
                        </Marker>
                     }
                    { driverdata.origin_latitude !== null &&
                        <MapViewDirections 
                          origin={{latitude:driverdata.origin_latitude,longitude:driverdata.origin_longitude}}
                          destination={{latitude:driverdata.destination_latitude,longitude:driverdata.destination_latitude}}
                          waypoints = {[{latitude:driverdata.waypoints_address_latitude,longitude:driverdata.waypoints_address_longitude},
                            {latitude:cusdata.origin_latitude,longitude:cusdata.origin_longitude}]}
                          optimizeWaypoints = {true}
                            apikey={GOOGLE_MAPS_APIKEY}

                          strokeWidth={4}
                          strokeColor={colors.black}
                        />
                    }
                </MapView>  
            </View>
            </ScrollView>
            <StatusBar style ="light" backgroundColor = "#2058c0" translucent ={true} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        paddingBottom:30,
        paddingTop:parameters.statusBarHeight
    },
    header:{
      backgroundColor:colors.blue,
      height:parameters.headerHeight,
      alignItems:"flex-start"
     
    },
    
    image1:{
     
      height:100,
      width:100,
    
    },
    
    image2:{height:60,width:60,
            borderRadius:30,
          },
    
    home:{
     backgroundColor:colors.blue,
     paddingLeft:20,
     
    },
    
    text1:{
     color:colors.white,
     fontSize:21,
     paddingBottom:20,
     paddingTop:20
    },
    
    text2:{
     color:colors.white,
     fontSize:16
    },
    
    view1:{
     flexDirection:"row",
     flex:1,
     paddingTop:30
    },
    
    button1:{
      height:40,
      width:150,
      backgroundColor:colors.black,
      borderRadius:20,
      alignItems:"center",
      justifyContent:"center",
      marginTop:20
    },
    
    button1Text:{
     color:colors.white,
     fontSize:17,
     marginTop:-2
    
    },
    card:{
     alignItems:"center",
     margin:SCREEN_WIDTH/22
    
    },
    
    view2:{marginBottom:5,
          borderRadius:15,
          backgroundColor:colors.grey6
        },
    
        title:{
          color:colors.black,
          fontSize:16
        },
    view3:{flexDirection:"row",
             marginTop :5,
             height:50,
             backgroundColor:colors.grey6,
             alignItems:"center",
             justifyContent:"space-between",
            marginHorizontal:15
            
             },
    text3:{marginLeft:15,
            fontSize:20,
            color:colors.black
      },
    
    view4:{ flexDirection:"row",
            alignItems:"center",
            marginRight:15,
            backgroundColor:"white",
            paddingHorizontal:10,
            paddingVertical:2,
            borderRadius:20
            },
    
    view5:{ flexDirection:"row",
    alignItems:"center",
    backgroundColor:"white",
    paddingVertical:25,
    justifyContent:"space-between",
    marginHorizontal:15,
    borderBottomColor:colors.grey4,
    borderBottomWidth:1,
    flex:1
    },
    
    view6:{
    
    
    alignItems:"center",
    flex:5,
    flexDirection:"row"
    },
    view7:{
    backgroundColor:colors.grey6,
    height:40,
    width:40,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    marginRight:20
    
    },
    
    map:{
       
    height: 150,
     marginVertical: 0,
     width:SCREEN_WIDTH*0.92
    },
    
    text4:{ fontSize:20,
          color:colors.black,
          marginLeft:20,
          marginBottom:20
        },
    
    icon1:  {marginLeft:10,
           marginTop:5
          },

    view8: {flex:4,
          marginTop:-25
        } ,
    carsAround: {
    width: 28,
    height: 14,
    
    }, 
    
    location: {
      width: 16,
      height: 16,
      borderRadius:8,
      backgroundColor:colors.blue,
      alignItems:"center",
      justifyContent:"center"
      
      }, 
      
    view9:{width:4,
    height:4,
    borderRadius:2,
    backgroundColor:"white"
    }


})
