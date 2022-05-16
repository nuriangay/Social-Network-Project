import axios from "axios";

import { setAlert } from "./alert";
import { CLEAR_PROFILE,GET_REPOS,GET_PROFILES, DELETE_ACCOUNT, GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE } from "./types";


//get current users profile

export const getCurrentProfile=()=>async dispatch=>{

    try {
        const res= await axios.get('/api/profile/me');
        dispatch({type:GET_PROFILE,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
    }



}


//get all profiles

export const getAllProfiles=()=>async dispatch=>{

    dispatch({type:CLEAR_PROFILE});

    try {
        const res= await axios.get('/api/profile');
        dispatch({type:GET_PROFILES,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
    }



}
//get the current profile by id(clicked)
export const getProfileById=(userId)=>async dispatch=>{

 

    try {
        const res= await axios.get(`/api/profile/user/${userId}`);
        dispatch({type:GET_PROFILE,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
    }



}
//get github repos

export const getRepos=(username)=>async dispatch=>{

    

    try {
        const res= await axios.get('/api/profile/github/username');
        dispatch({type:GET_REPOS,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
    }



}


//create or update a profile 


export const createProfile=(formData,navigate,edit=false) =>async dispatch=>{
    try {
       

        const res=await axios.post('/api/profile',formData);

        dispatch({type:GET_PROFILE,payload:res.data})

        dispatch(setAlert(edit?'profile updated':'profile created', 'success'))

        if(!edit){
            navigate('/dashboard')

        }
        
    } catch (err) {
        const errors=err.response.data.errors;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        

        
    }



}


//add experience

export const addExperience=(formData,navigate)=>async dispatch=>{
    try {
       

        const res=await axios.put('/api/profile/experience',formData);

        dispatch({type:UPDATE_PROFILE,payload:res.data})

        dispatch(setAlert('experience added', 'success'))
            navigate('/dashboard');

        
        
    } catch (err) {
        const errors=err.response.data.errors;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        

        
    }

    


}

export const addEducation=(formData,navigate)=>async dispatch=>{
    try {
       

        const res=await axios.put('/api/profile/education',formData);

        dispatch({type:UPDATE_PROFILE,payload:res.data})

        dispatch(setAlert('education added', 'success'))
            navigate('/dashboard');

        
        
    } catch (err) {
        const errors=err.response.data.errors;

        if(errors){
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')));
        }
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        

        
    }

    


}

//DELETE EXPERİENCE


export const deleteExperience=id=>async dispatch=>{

    try {
        const res =await axios.delete(`/api/profile/experience/${id}`)

        dispatch({type:UPDATE_PROFILE,payload:res.data})

        dispatch(setAlert('experience deleted', 'success'))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        
        
    }

}
export const deleteEducation=id=>async dispatch=>{

    try {
        const res =await axios.delete(`/api/profile/education/${id}`)

        dispatch({type:UPDATE_PROFILE,payload:res.data})

        dispatch(setAlert('education deleted', 'success'))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        
        
    }

}




//delete account and profile


export const deleteAccount=()=>async dispatch=>{

    if(window.confirm('are you sure?Want To delete your account')){

    try {
        const res =await axios.delete(`/api/profile`)

        dispatch({type:CLEAR_PROFILE})
        dispatch({type:DELETE_ACCOUNT})

        dispatch(setAlert('Account deleted'))
        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        });
        
        
    }



}

}
