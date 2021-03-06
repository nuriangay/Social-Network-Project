import React from 'react'
import {Link} from 'react-router-dom'
import { Fragment } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deletePost } from '../../actions/post'
import { addLike,removeLike } from '../../actions/post'
import Post from '../post/Post'
 const PostItem = ({showActions,deletePost,removeLike,addLike,auth,post:{_id,text,avatar,name,user,likes,comments,date}}) => {
  return (
      <section className='container'>
    <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                class="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
             {text}
            </p>
             <p class="post-date">
                Posted on <Moment format='YYYY/MM/DD'>{ date}</Moment>
            </p>

            {showActions&&<Fragment>
              <button onClick={e=>addLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-up"></i>
              <span> {likes.length>0 &&(<span>{likes.length}</span>)} </span>
            </button>
            <button onClick={e=>removeLike(_id)} type="button" class="btn btn-light">
              <i class="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} class="btn btn-primary">
              Discussions {comments.length>0 &&(<span class='comment-count'>{comments.length}</span>)} 
            </Link>
            
                 <button  onClick={e=>deletePost(_id)}     
                 type="button"
                 class="btn btn-danger"
               >
                 <i class="fas fa-times"/>
               </button>
            </Fragment>}
            
           
          </div>
        </div>
        </section>
  )
 
}

PostItem.defaultProps={showActions:true}
const mapStateToProps=state =>({
    auth:state.auth
})
export default connect(mapStateToProps,{addLike,removeLike,deletePost})(PostItem)
