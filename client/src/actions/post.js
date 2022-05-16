import axios from "axios";

import { setAlert } from "./alert";
import { REMOVE_COMMENT,ADD_COMMENT,ADD_POST, DELETE_POST, GET_POSTS,POST_ERROR,UPDATE_LIKES,GET_POST } from "./types";




//get posts


export const getPosts=()=>async dispatch=>{

    try {
        const res =await axios.get('/api/posts');

        dispatch({type:GET_POSTS,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}

//ADD LİKE

export const addLike=(id)=>async dispatch=>{

    try {
        const res =await axios.put(`/api/posts/like/${id}`);

        dispatch({type:UPDATE_LIKES,payload:{id,likes:res.data}})
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}

//remove like
export const removeLike=(id)=>async dispatch=>{

    try {
        const res =await axios.put(`/api/posts/unlike/${id}`);

        dispatch({type:UPDATE_LIKES,payload:{id,likes:res.data}})
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}

//delete post
export const deletePost=(id)=>async dispatch=>{

    try {
       await axios.delete(`/api/posts/${id}`);

        dispatch({type:DELETE_POST,payload:{id}})

        dispatch(setAlert('post removed', 'success'))
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}
//ADD post
export const addPost=(formData)=>async dispatch=>{

    try {
        const res =await axios.post(`/api/posts/`,formData);

        dispatch({type:ADD_POST,payload:res.data})

        dispatch(setAlert('post created', 'success'))
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}

export const getPost=(id)=>async dispatch=>{

    try {
        const res =await axios.get(`/api/posts/${id}`);

        dispatch({type:GET_POST,payload:res.data})
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}


export const addComment=(postId,formData)=>async dispatch=>{

    try {
        const res =await axios.post(`/api/posts/comment/${postId}`,formData);

        dispatch({type:ADD_COMMENT,payload:res.data})

        dispatch(setAlert('comment created', 'success'))
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}
export const deleteComment=(postId,commentId)=>async dispatch=>{

    try {
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({type:REMOVE_COMMENT,payload:commentId})

        dispatch(setAlert('comment removed', 'success'))
        
    } catch (err) {
        dispatch({
            type:POST_ERROR,payload:{msg:err.response.statusText,status:err.response.status}

        })
        
        
    }
}