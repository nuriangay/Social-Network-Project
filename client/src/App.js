import React, { useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import  Register  from './components/auth/Register';
import  Login  from './components/auth/Login';
import Alert from './components/layout/Alert';
import  ProfileForm  from './components/profileForm/ProfileForm';
import AddExperience from './components/profileForm/AddExperience';

//redux
import {Provider} from 'react-redux';
import Post from './components/post/Post';
import store from './store'
import setAuthToken from './utils/setAuthToken';
import Profiles from './components/profiles/Profiles';
import { loadUser } from './actions/auth';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AddEducation from './components/profileForm/AddEducation';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';




const App =()=> {

  useEffect(()=>{

    if(localStorage.token){
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser(),[]);


  })
  return(
    <Provider store={store}>
  
  <Router>
     <Navbar/>
     <Alert/>
    <Routes>

      
     
      <Route  path='/' element={<Landing/>}/>
      <Route  path='login' element={<Login/>}/>
      <Route  path='register' element={<Register/>}/>
      <Route  path='/profiles' element={<Profiles/>}/>
      <Route  path='/profile/:id' element={<Profile/>}/>
      <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
       <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
        <Route
            path="/edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="/add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
           <Route
            path="/add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
           <Route
            path="/posts"
            element={<PrivateRoute component={Posts} />}
          />
            <Route
            path="/posts/:id"
            element={<PrivateRoute component={Post} />}
          />
          
        
     
    

    </Routes>
   
    
    </Router>
    </Provider>
  
  )}


export default App;
