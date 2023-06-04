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
import MapViewDirections from 'react-native-maps-directions';
import { mapStyle} from "../global/mapStyle"
import {GOOGLE_MAPS_APIKEY, URL} from "@env";
import axios from 'axios';

const HomeScreen = ({navigation}) => {
const {User,dispatchUser} = useContext(UserNameAndTime)

const {origin,dispatchOrigin} = useContext(OriginContext)
const {destination,dispatchDestination} = useContext(DestinationContext)
const [latlng,setLatLng] = useState({})
const [DriverOrigin,setUserOrigin] = useState({})
const [DriverDestination,setUserDestination] = useState({}) 
const [DriverWaypoint,setUserWaypoint] = useState({}) 
const [CusOrigin,setCusOrigin] = useState({}) 




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
const [driverdataName,setdriverdataName] = useState({
    name:""
})
const [driverdataTime,setdriverdataTime] = useState({
    time:""
})
const [driverdataOrigin_address,setdriverdataOrigin_address] = useState({
    origin_address:""
})
const [driverdataOrigin_latitude,setdriverdataOrigin_latitude] = useState({
    origin_latitude:24.820525
})
const [driverdataOrigin_longitude,setdriverdataOrigin_longitude] = useState({
    origin_longitude:121.0279874
})
const [driverdataDestination_address,setdriverdataDestination_address] = useState({
    destination_address:""
})

const [driverdataDestination_latitude,setdriverdataDestination_latitude] = useState({
    destination_latitude:25.1197546
})

const [driverdataDestination_longitude,setdriverdataDestination_longitude] = useState({
    destination_longitude:121.5201492
})
const [driverdataWaypoints_address,setdriverdataWaypoints_address]= useState({
    waypoints_address:""
})
const [driverdataWaypoints_address_latitude,setdriverdataWaypoints_address_latitude]= useState({
    waypoints_address_latitude:25.0109536
})
const [driverdataWaypoints_address_longitude,setdriverdataWaypoints_address_longitude]= useState({
    waypoints_address_longitude:121.2173832
})
// const [driverdataOrigin_laatitude,setdriverdaataOrigin_latitude] = useState({
//     name: "",
//     time: "",                        
//     origin_address: "",
//     origin_latitude: "",
//     origin_longitude: "",
//     destination_address: "",
//     destination_latitude: "",
//     destination_longitude: "",
//     waypoints_address: "",
//     waypoints_address_latitude:"",
//     waypoints_address_longitude:""
// })

// const [cusdata,setcusdata] = useState({
//     name: "",
//     time: "",                        
//     origin_address: "",
//     origin_latitude: "",
//     origin_longitude: "",
//     destination_address: "",
//     destination_latitude: "",
//     destination_longitude: "",
//     waypoints_address: "",
//     waypoints_address_latitude:"",
//     waypoints_address_longitude:""
// })

const [cusdataName, setcusdataName] = useState({
    name: "" 
})
const [cusdataTime, setcusdataTime] = useState({
    time: "" 
    })
const [cusdataOrigin_address, setcusdataOrigin_address] = useState({ 
    origin_address: "" 
})
const [cusdataOrigin_latitude, setcusdataOrigin_latitude] = useState({ 
    origin_latitude: 25.0329636 
})
const [cusdataOrigin_longitude, setcusdataOrigin_longitude] = useState({ 
    origin_longitude: 121.5654268 
})
const [cusdataDestination_address, setcusdataDestination_address] = useState({ 
    destination_address: "" 
})
const [cusdataDestination_latitude, setcusdataDestination_latitude] = useState({ 
    destination_latitude: 22.9998999
})
const [cusdataDestination_longitude, setcusdataDestination_longitude] = useState({ 
    destination_longitude: 120.2268758
})
const [cusdataWaypoints_address, setcusdataWaypoints_address] = useState({ 
    waypoints_address: "" 
})
const [cusdataWaypoints_latitude, setcusdataWaypoints_latitude] = useState({ 
    waypoints_address_latitude: "" 
})
const [cusdataWaypoints_longitude, setcusdataWaypoints_longitude] = useState({ 
    waypoints_address_longitude: "" 
})

const fetchDriverData = async () => {
    try {
        const response = await axios.get(URL +'/driver');
        console.log(response.data);
        const driverResponse = response.data;
        setdriverdataName({
            name: driverResponse.name
        });
        setdriverdataTime({
            time: driverResponse.time
        });
        setdriverdataOrigin_address({
            origin_address: driverResponse.origin_address
        });
        setdriverdataOrigin_latitude({
            origin_latitude: driverResponse.origin_latitude
        });
        setdriverdataOrigin_longitude({
            origin_longitude: driverResponse.origin_longitude
        });
        setdriverdataDestination_address({
            destination_address: driverResponse.destination_address
        });
        setdriverdataDestination_latitude({
            destination_latitude: driverResponse.destination_latitude
        });
        setdriverdataDestination_longitude({
            destination_longitude: driverResponse.destination_longitude
        });
        setdriverdataWaypoints_address({
            waypoints_address: driverResponse.waypoints_address
        });
        setdriverdataWaypoints_address_latitude({
            waypoints_address_latitude: driverResponse.waypoints_address_latitude
        });
        setdriverdataWaypoints_address_longitude({
            waypoints_address_longitude: driverResponse.waypoints_address_longitude
        });
        // setdriverdata({
        //     name: driverResponse.name,
        //     time: driverResponse.time,
        //     origin_address: driverResponse.origin_address,
        //     origin_latitude: driverResponse.origin_latitude,
        //     origin_longitude: driverResponse.origin_longitude,
        //     destination_address: driverResponse.destination_address,
        //     destination_latitude: driverResponse.destination_latitude,
        //     destination_longitude: driverResponse.destination_longitude,
        //     waypoints_address: driverResponse.waypoints_address,
        //     waypoints_address_latitude:driverResponse.waypoints_address_latitude,
        //     waypoints_address_longitude:driverResponse.waypoints_address_longitude
        // });
    } catch (error) {
        console.error('Fail:', error);
    }
};

const fetchCustomerData = async () => {
    try {
        const response = await axios.get(URL +'/passenger');
        console.log(response.data);
        const customerResponse = response.data;
        setcusdataName({
            name: customerResponse.name 
        });
        setcusdataTime({ 
            time: customerResponse.time 
        });
        setcusdataOrigin_address({ 
            origin_address: customerResponse.origin_address 
        });
        setcusdataOrigin_latitude({ 
            origin_latitude: customerResponse.origin_latitude 
        });
        setcusdataOrigin_longitude({ 
            origin_longitude: customerResponse.origin_longitude 
        });
        setcusdataDestination_address({ 
            destination_address: customerResponse.destination_address 
        });
        setcusdataDestination_latitude({ 
            destination_latitude: customerResponse.destination_latitude 
        });
        setcusdataDestination_longitude({ 
            destination_longitude: customerResponse.destination_longitude 
        });
        setcusdataWaypoints_address({ 
            waypoints_address: customerResponse.waypoints_address 
        });
        setcusdataWaypoints_latitude({ 
            waypoints_address_latitude: customerResponse.waypoints_address_latitude 
        });
        setcusdataWaypoints_longitude({ 
            waypoints_address_longitude: customerResponse.waypoints_address_longitude 
        });
        // setcusdata({
        //     name: customerResponse.name,
        //     time: customerResponse.time,
        //     origin_address: customerResponse.origin_address,
        //     origin_latitude: customerResponse.origin_latitude,
        //     origin_longitude: customerResponse.origin_longitude,
        //     destination_address: customerResponse.destination_address,
        //     destination_latitude: customerResponse.destination_latitude,
        //     destination_longitude: customerResponse.destination_longitude,
        //     waypoints_address: customerResponse.waypoints_address,
        //     waypoints_address_latitude:customerResponse.waypoints_address_latitude,
        //     waypoints_address_longitude:customerResponse.waypoints_address_longitude
        // });
    } catch (error) {
        console.error('Fail:', error);
    }
};
const _map = useRef(1);

let flag1 = false;

useEffect(()=>{
    async function fetchdata(){
        await fetchCustomerData();
        await fetchDriverData();
        flag1 = true;
        setUserOrigin({latitude:parseFloat(driverdataOrigin_latitude.origin_latitude),
            longitude:parseFloat(driverdataOrigin_longitude.origin_longitude)});
        setUserDestination({latitude:parseFloat(driverdataDestination_latitude.destination_latitude),
            longitude: parseFloat(driverdataDestination_longitude.destination_longitude)});
        setUserWaypoint({latitude:parseFloat(driverdataWaypoints_address_latitude.waypoints_address_latitude),
            longitude:parseFloat(driverdataWaypoints_address_longitude.waypoints_address_longitude)});
        setCusOrigin({latitude:parseFloat(cusdataOrigin_latitude.origin_latitude),
            longitude:parseFloat(cusdataOrigin_longitude.origin_longitude)});
        console.log("driverdata: ", driverdataOrigin_longitude);
        console.log("driverdata: ", driverdataOrigin_latitude);
        console.log("cusdata: ", cusdataName);
        console.log("cusdata: ", cusdataTime);
        console.log("cusdata: ", cusdataOrigin_address.origin_address);
        console.log("start:", CusOrigin);
    }
    fetchdata();
},[])

    return (
        <View style ={styles.container}>
            
            <ScrollView bounces ={false}>
                <View style ={styles.home}>
                    <Text style = {styles.text1}>Match !!!</Text>
                    
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
                                <Text style ={{fontSize:18,color:colors.black}}>Driver:{driverdataName.name}</Text>
                                <Text style ={{color:colors.grey3}}>FCN-0857</Text>
                                <Text style ={{color:colors.grey3}}>出發時間:{driverdataTime.time}</Text>
                                <Text style ={{fontSize:18,color:colors.black}}>Customer:{cusdataName.name}</Text>
                                <Text style ={{color:colors.grey3}}>出發時間:{cusdataTime.time}</Text>
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
                     { DriverOrigin.latitude != null &&   
                        <Marker coordinate = {DriverOrigin} anchor = {{x:0.5,y:0.5}} >
                            <Image 
                                source ={require('../../assets/location.png')}
                                style ={styles.markerOrigin2}
                                resizeMode ="cover"
                            />
                        </Marker>
                     }
                     { DriverDestination.latitude != null &&   
                        <Marker coordinate = {DriverDestination} anchor = {{x:0.5,y:0.5}} >
                            <Image 
                                source ={require('../../assets/location.png')}
                                style ={styles.markerDestination}
                                resizeMode ="cover"
                            />
                        </Marker>
                     }
                    { DriverWaypoint.latitude !== null && CusOrigin.latitude !== null &&
                        <MapViewDirections 
                          origin={DriverOrigin}
                          destination={DriverDestination}
                          waypoints = {[CusOrigin]}
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
       
    height: 600,
     marginVertical: 0,
     width:SCREEN_WIDTH
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
