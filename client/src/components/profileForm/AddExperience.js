 import React,{useState} from 'react'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import {Link,useNavigate} from 'react-router-dom'


 const AddExperience = ({addExperience}) => {
     const navigate=useNavigate();
    const [formData,SetFormData]=useState({

        company:'',
        title:'',
        location:'',
        from:'',
        to:'',
        current:false,
        description:''
    })

    const [ToDateDisabled,toggleDisabled]=useState(false);


    const {company,title,location,from,to,current,description}=formData;

    const onChange=e=>SetFormData({...formData,[e.target.name]:e.target.value})


    
  return (

    
    <section className="container">
    <h1 className="large text-primary">
     Add An Experience
    </h1>
    <p className="lead">
      <i className="fas fa-code-branch"></i> Add any developer/programming
      positions that you have had in the past
    </p>
    <small>* = required field</small>
    <form className="form" onSubmit={(e)=>{e.preventDefault(); addExperience(formData,navigate)}}>
      <div className="form-group">
        <input type="text" placeholder="* Job Title" value={title} onChange={(e)=>onChange(e)} name="title" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="* Company" value={company} onChange={(e)=>onChange(e)} name="company" required />
      </div>
      <div className="form-group">
        <input type="text" placeholder="Location" value={location} onChange={(e)=>onChange(e)} name="location" />
      </div>
      <div className="form-group">
        <h4>From Date</h4>
        <input type="date" name="from" value={from} onChange={(e)=>onChange(e)}  />
      </div>
       <div className="form-group">
        <p><input type="checkbox" name="current" checked={current} value={current} onChange={(e)=>{SetFormData({...formData,current:!current}); toggleDisabled(!ToDateDisabled) }}/>{' '} Current Job</p>
      </div>
      <div className="form-group">
        <h4>To Date</h4>
        <input type="date" name="to" value={to} onChange={(e)=>onChange(e)} disabled={ToDateDisabled?'disabled':''} />
      </div>
      <div className="form-group">
        <textarea value={description} onChange={(e)=>onChange(e)}
          name="description"
          cols="30"
          rows="5"
          placeholder="Job Description"
        ></textarea>
      </div>
      <input type="submit" class="btn btn-primary my-1" />
      <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
    </form>
  </section>
  )
}
export default connect(null,{addExperience})(AddExperience)
