import React,{createContext,useReducer} from 'react';
import {OriginReducer,DestinationReducer,WaypointReducer,UserReducer} from  '../reducers/reducers'

export const OriginContext = createContext()
export const DestinationContext = createContext()
export const WaypointContext = createContext()
export const UserNameAndTime = createContext()

export const UserNameAndTimeContextProvider = (props)=>{
    const[User,dispatchUser] =useReducer(UserReducer,{
                name:"",
                time:""
    })
    return(
        <UserNameAndTime.Provider
                value ={{User,dispatchUser}}
            >
            {props.children}
        </UserNameAndTime.Provider>
    )
}
export const OriginContextProvider = (props)=>{
    const[origin,dispatchOrigin] =useReducer(OriginReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <OriginContext.Provider
                value ={{origin,dispatchOrigin}}
            >
            {props.children}
        </OriginContext.Provider>
    )
}


export const DestinationContextProvider = (props)=>{
    const[destination,dispatchDestination] =useReducer(DestinationReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <DestinationContext.Provider
                value ={{destination,dispatchDestination}}
            >
            {props.children}
        </DestinationContext.Provider>
    )
}

export const WaypointContextProvider = (props)=>{
    const[Waypoint,dispatchWaypoint] =useReducer(WaypointReducer,{
                latitude:null,
                longitude:null,
                address:"",
                name:""
    })
    return(
        <WaypointContext.Provider
                value ={{Waypoint,dispatchWaypoint}}
            >
            {props.children}
        </WaypointContext.Provider>
    )
}