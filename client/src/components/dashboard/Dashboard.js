import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import { getCurrentProfile } from '../../actions/profile';
import Education from './Education';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import { deleteAccount } from '../../actions/profile';
const Dashboard = ({deleteAccount,getCurrentProfile,auth:{user},profile:{profile}}) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile])
  return ( 
    <section className="container">
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user" /> Welcome {user && user.name}
    </p>

    {profile!==null ?<><DashboardActions/><Experience experience={profile.experience}/><Education education={profile.education}/><div className='my-2'><button onClick={()=>deleteAccount()} className='btn btn-danger'><i className='fas fa-user-minus'>Delete My Account</i></button></div></>:<><p>You have not setup a profile,please add some profile information</p><Link to='/create-profile ' className='btn btn-primary my-1' >Create Profile</Link></>}


    </section>


  
  
    
  )
}
const mapStateToProps =state=>({
    auth:state.auth,
    profile:state.profile
})
export default connect(mapStateToProps,{getCurrentProfile,deleteAccount})(Dashboard);
