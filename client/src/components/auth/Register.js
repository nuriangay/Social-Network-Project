import React from 'react'
import { useState } from 'react';
import {connect} from 'react-redux'
import { setAlert } from '../../actions/alert';
import { setRegister } from '../../actions/auth';

import {Link,Navigate} from 'react-router-dom'


const Register = ({setAlert,setRegister,isAuthenticated}) => {

     const[formData,setFormata]=useState({
         name:'',email:'',password:'',password2:''
 });

     const {name,email,password,password2}=formData;


 const onChange=e=>{
         setFormata({...formData,[e.target.name]:e.target.value});


     }
    const onSubmit=async e=>{
         e.preventDefault();
         if(password!==password2){
            setAlert('passwords do not match','danger');

            //register user without Redux
    //     }else{
    //         const newUser={
    //             name,email,password
    //         }
    //         try {
    //             const config={
    //                 headers:{
    //                     'Content-Type':'application/json'
    //                 }

    //             }

    //             const body=JSON.stringify(newUser);
    //             const res=await axios.post('/api/users',body,config);
    //             console.log(res.data)
                
    //         } catch (err) {
    //             console.error(err.response.data)
                
    //         }
        }else{
          setRegister({name,email,password});

        }
     }
     if(isAuthenticated){
       return <Navigate to='/dashboard'/>
     }

    
  return (
    <section className="container">
    <h1 className="large text-primary">Sign Up</h1>
    <p className="lead"><i class="fas fa-user"></i> Create Your Account</p>
    <form className="form" onSubmit={e=>onSubmit(e)}>
      <div className="form-group">
        <input type="text" placeholder="Name" name="name" value={name} onChange={e=>onChange(e)} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email Address " value={email} onChange={e=>onChange(e)} name="email" />
        <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
          Gravatar email</small
        >
      </div>
      <div className="form-group">
        <input value={password} onChange={e=>onChange(e)}
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
        />
      </div>
      <div className="form-group">
        <input value={password2} onChange={e=>onChange(e)}
          type="password"
          placeholder="Confirm Password"
          name="password2"
          minLength="6"
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Register" />
    </form>
    <p className="my-1">
      Already have an account? <Link to="/login">Sign In</Link>
    </p>
  </section>
     
   
  );
};

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{setAlert,setRegister,mapStateToProps})(Register);
