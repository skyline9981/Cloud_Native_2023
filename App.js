import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native'

import HomeScreen from './src/screens/HomeScreen'
import RequestScreen from './src/screens/RequestScreen'
import DestinationScreen from './src/screens/DestinationScreen'
 import { OriginContextProvider,DestinationContextProvider } from './src/contexts/contexts'
 import RoootNavigator from './src/navigations/RootNavigator'


const App = () => {
  return (
    //<View>
    //  <DestinationScreen/>
    //</View>
    //<RoootNavigator />
   <DestinationContextProvider>
     <OriginContextProvider>
         <RoootNavigator />
    </OriginContextProvider>
    </DestinationContextProvider>
   
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1
  }

})