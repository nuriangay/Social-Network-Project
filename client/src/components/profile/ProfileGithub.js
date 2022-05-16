import React from 'react'
import {connect} from 'react-redux'
import { getRepos } from '../../actions/profile'
import { useEffect } from 'react'
import Spinner from '../layout/Spinner'
 const ProfileGithub = ({username,getRepos,repos}) => {

    useEffect(()=>{
        getRepos(username);
    },[getRepos])
  return (
    <section className='container'>

        <div className='profile-github'>

            <h2 className='text-primary my-1'>Github Repos</h2>

            {repos===null ?<Spinner/> : (repos.map(repo=>(<div key={repo._id} className='repo bg-white p-1 my-1'>

                <div>
                    <h4>

                        <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>{repo.name}</a>
                    </h4>
                    <p>{repo.description}</p>

                    <div ><ul>

                        <li className='badge badge-primary'>Stars:{repo.stargazers_count}</li>
                        <li className='badge badge-light'>Watchers:{repo.watchers_count}</li>
                        <li className='badge badge-light'>Forks:{repo.froks_count}</li>
                        
                        </ul></div>


                </div>
            </div>)))}
        </div>
    </section>
  )
}

const mapSateToProps=state=>({
    repos:state.profile.repos
})
export default connect(mapSateToProps,{getRepos})(ProfileGithub)
