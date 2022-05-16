import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPost } from '../../actions/post'
import { useParams } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import { Fragment } from 'react'
import {Link} from 'react-router-dom'
import CommentForm from './CommentForm'
import CommentItem from  '../post/CommentItem'

 const Post = ({getPost,post:{post,loading},match}) => {
     const {id}=useParams();

    useEffect(()=>{
        getPost(id);

    },[getPost,id])
  return (
      
    loading|| post===null? <Spinner/>: <section className='container'>

        <Link to='/posts' className='btn  ' >Back to posts</Link>
        
        
        <PostItem post={post} showActions={false}/>
        <CommentForm postId={post._id}/>

        <div className='comments'>{post.comments.map(comment=>(

            <CommentItem key={comment._id} comment={comment} postId={post._id}/>
        ))}</div>


        
        
        </section>
  )
}
const mapStateToProps =state=>({
    post:state.post

})
export default  connect(mapStateToProps,{getPost})(Post)
