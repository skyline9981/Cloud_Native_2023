import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'

import HomeScreen from './src/screens/HomeScreen'
import RequestScreen from './src/screens/WpRequestScreen'
import DestinationScreen from './src/screens/WpDestinationScreen'
 import { OriginContextProvider,DestinationContextProvider ,WaypointContextProvider,UserNameAndTimeContextProvider} from './src/contexts/contexts'
 import RoootNavigator from './src/navigations/RootNavigator'


const App = () => {
  return (
    //<View>
    //  <DestinationScreen/>
    //</View>
    //<RoootNavigator />
    <UserNameAndTimeContextProvider>
   <WaypointContextProvider>
   <DestinationContextProvider>
     <OriginContextProvider>
         <RoootNavigator />
    </OriginContextProvider>
    </DestinationContextProvider>
    </WaypointContextProvider>
    </UserNameAndTimeContextProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1
  }

})