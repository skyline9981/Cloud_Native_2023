
export const OriginReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_ORIGIN':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}
export const UserReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_USER':
            return{
                name:action.payload.name,
                time:action.payload.time
            }
            default:
                return state
        }
    }



export const DestinationReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_DESTINATION':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}

export const WaypointReducer = (state,action)=>{
    switch(action.type){
        case 'ADD_WAYPOINT':
                return{
                    latitude:action.payload.latitude,
                    longitude:action.payload.longitude,
                    address:action.payload.address,
                    name:action.payload.name
                }
            default:
                return state
    }
}