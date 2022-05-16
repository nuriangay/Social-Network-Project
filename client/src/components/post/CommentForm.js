import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'
const CommentForm = ({addComment,postId}) => {
    const[comment,setComment]=useState('')
  return (
    <section className='container'>
    <div class="post-form">
        <div class="bg-primary p">
          <h3>Leave A Comment</h3>
        </div>
        <form class="form my-1" onSubmit={e=>{e.preventDefault(); addComment({comment},postId);setComment('')}}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={comment}
            onChange={e=>setComment(e.target.value)}
        
            placeholder="Comment on this post"
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
      </section>
  )
}
export default connect(null,{addComment})(CommentForm)
