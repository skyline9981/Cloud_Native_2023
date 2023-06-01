import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'

import HomeScreen from './src/screens/HomeScreen'
import RequestScreen from './src/screens/WpRequestScreen'
import DestinationScreen from './src/screens/WpDestinationScreen'
 import { OriginContextProvider,DestinationContextProvider ,WaypointContextProvider} from './src/contexts/contexts'
 import RoootNavigator from './src/navigations/RootNavigator'


const App = () => {
  return (
    //<View>
    //  <DestinationScreen/>
    //</View>
    //<RoootNavigator />
   <WaypointContextProvider>
   <DestinationContextProvider>
     <OriginContextProvider>
         <RoootNavigator />
    </OriginContextProvider>
    </DestinationContextProvider>
    </WaypointContextProvider>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1
  }

})