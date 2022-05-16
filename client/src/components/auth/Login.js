import React from 'react'
import { useState } from 'react';
import { connect } from 'react-redux';
import {loginUser} from '../../actions/auth'

import {Link,Navigate} from 'react-router-dom'


const Login = ({loginUser,isAuthenticated}) => {

     const[formData,setFormata]=useState({
         email:'',password:''
 });

     const {email,password}=formData;


 const onChange=e=>{
         setFormata({...formData,[e.target.name]:e.target.value});


     }
    const onSubmit=async e=>{
         e.preventDefault();
         loginUser(email,password);
        
    
        }


        //redirect

        if(isAuthenticated){
            return <Navigate to ='/dashboard'/>

        }
     

    
  return (
    <section className="container">
    <h1 className="large text-primary">Sign In</h1>
    <p className="lead"><i className="fas fa-user"></i> SIGN IN TO YOUR ACCOUNT</p>
    <form className="form" onSubmit={e=>onSubmit(e)}>
     
      <div className="form-group">
        <input type="email" placeholder="Email Address " value={email} onChange={e=>onChange(e)} name="email" />
       
      </div>
      <div className="form-group">
        <input value={password} onChange={e=>onChange(e)}
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
        />
      </div>
      
      <input type="submit" className="btn btn-primary" value="Login" />
    </form>
    <p className="my-1">
      Don't have an account? <Link to="/register">Sign Up</Link>
    </p>
  </section>
     
   
  );
};

const mapStateToProps=state=>({
    isAuthenticated:state.auth.isAuthenticated
})
export default  connect(mapStateToProps,{loginUser})(Login);
