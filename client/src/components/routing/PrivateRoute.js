import React from 'react'
import { connect } from 'react-redux'
import {Navigate} from 'react-router-dom'

 const PrivateRoute = ({component:Component,auth}) =>{
    if (auth.isAuthenticated) return <Component />;

    return <Navigate to="/login" />;
 } 

   
 
 
const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
