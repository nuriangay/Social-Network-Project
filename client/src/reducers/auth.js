import { LOGOUT,REGISTER_SUCCESS,REGISTER_FAIL,AUTH_ERROR,USER_LOADED,LOGIN_FAIL,LOGIN_SUCCESS, DELETE_ACCOUNT } from "../actions/types";


const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:null,
    loading:true,
    user:null
}
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case REGISTER_SUCCESS:
            case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return {...state,...payload,isAuthenticated:true,loading:false}

        case REGISTER_FAIL:
            case LOGIN_FAIL:
            case AUTH_ERROR:
            case LOGOUT:
            case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return {...state,token:null,isAuthenticated:false,loading:false,user:null}
            default:
                return state;

        case USER_LOADED:
            return {...state,isAuthenticated:true,loading:false,user:payload}
        


    }

}
