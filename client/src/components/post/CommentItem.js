import React from 'react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
 const CommentItem = ({postId,comment:{_id,text,name,avatar,user,date}}) => {
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
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
          </div>
          </div>
      </section>
    
  )
}
const mapStateToProps =state=>({
    state:state.auth
})
export default  connect(mapStateToProps,{})(CommentItem)
