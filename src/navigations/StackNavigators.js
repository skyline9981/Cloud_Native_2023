import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen'
import WpRequestScreen from '../screens/WpRequestScreen';
import WpDestinationScreen from '../screens/WpDestinationScreen';
import RequestScreen from '../screens/RequestScreen';
import DestinationScreen from '../screens/DestinationScreen';
const Home = createNativeStackNavigator();

export function HomeStack(){
    return(
        <Home.Navigator>
            <Home.Screen 
                name ="HomeScreen"
                component = {HomeScreen}
                options ={{headerShown:false}}
            />
            <Home.Screen 
                name ="WpRequestScreen"
                component = {WpRequestScreen}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="RequestScreen"
                component = {RequestScreen}
                options ={{headerShown:false}}
            /> 
             <Home.Screen 
                name ="WpDestinationScreen"
                component = {WpDestinationScreen}
                options ={{headerShown:false}}
            /> 
            <Home.Screen 
                name ="DestinationScreen"
                component = {DestinationScreen}
                options ={{headerShown:false}}
            /> 
        </Home.Navigator>
    )
}