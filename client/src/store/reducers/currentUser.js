import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE = {
    isAuthenticated: false, //true when logged in
    user: {} //user info
};


export default (state = DEFAULT_STATE, action) =>{
    switch(action.type){
        case SET_CURRENT_USER:
            return {
                //if there are keys returns true
                isAuthenticated: !!Object.keys(action.user).length,
                user: action.user
            };
            default:
                return state;
    }
}