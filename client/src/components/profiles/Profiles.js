import React from 'react'
import { useEffect,Fragment } from 'react'
import {connect} from 'react-redux'
import Spinner from '../layout/Spinner'
import { getAllProfiles } from '../../actions/profile'
import ProfileItem from './ProfileItem'
 const Profiles = ({getAllProfiles,profile:{profiles,loading}}) => {
     useEffect(()=>{
         getAllProfiles();

     },[getAllProfiles])
     return (
        <section className="container">
          {loading ? (
            <Spinner />
          ) : (
            <Fragment>
              <h1 className="large text-primary">Developers</h1>
              <p className="lead">
                <i className="fab fa-connectdevelop" /> Browse and connect with
                developers
              </p>
              <div className="profiles">
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No profiles found...</h4>
                )}
              </div>
            </Fragment>
          )}
        </section>
      );
}
const mapStateToProps=(state)=>({
    profile:state.profile
})
export default connect(mapStateToProps,{getAllProfiles}) (Profiles);
