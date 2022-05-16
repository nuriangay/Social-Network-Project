const express=require('express')
const auth=require('../../middleware/auth')
const Profile=require('../../models/ProfileModel')
const User=require('../../models/UserModel')
const {check,validationResult}=require('express-validator/check')
const request=require('request')
const config=require('config')
const router=express.Router();

// @route GET api/profile/me
//@desc get current users profile
// @access private
router.get('/me',auth,async(req,res) =>{

    try {
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'there is no profile for this user'})

        }

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')

        
    }


});

//POST api/profile
//@desc create or update profile
//private 


router.post('/',[auth,[check('status','status is required').not().isEmpty(),

                check('skills','skills is required').not().isEmpty()

]],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array});
    }

    const {company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedn


    }=req.body;

    //build profile object

    const profileFields={};
    profileFields.user=req.user.id;

    if(company)profileFields.company=company;
    if(website)profileFields.website=website;
    if(location)profileFields.location=location;
    if(bio)profileFields.bio=bio;
    if(status)profileFields.status=status;
    if(githubusername)profileFields.githubusername=githubusername;
    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim())


    }

    //build social object
    profileFields.social={};
    if(youtube)profileFields.social.youtube=youtube;
    if(twitter)profileFields.social.twitter=twitter;
    if(facebook)profileFields.social.facebook=facebook;
    if(linkedn)profileFields.social.linkedn=linkedn;
    if(instagram)profileFields.social.instagram=instagram;
    
  try {
      let profile=await Profile.findOne({user:req.user.id});

      if(profile){
          //update profile

          profile=await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});

          return res.json(profile)
      }

      //create profile

      profile=new Profile(profileFields);
      await profile.save()
      res.json(profile)
      
  } catch (err) {
      console.error(err.message);
      res.status(500).send('server error')
      
  }



})

//route GET api/profile
//desc  get all profiles
// public

router.get('/',async(req,res)=>{

    try {
        const profiles= await Profile.find().populate('user',['name','avatar']);
        res.json(profiles)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }

});

//route GET api/profile/user/:user_id
//desc  get all profile by user id
// public

router.get('/user/:user_id',async(req,res)=>{

    try {
        const profile= await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile){
            res.status(400).json({msg:'Profile not found'})
        }
        
        res.json(profile)
        
    } catch (err) {
        console.error(err.message);
        if(err.kind=='ObjectId'){
            res.status(400).json({msg:'Profile not found'})

        }
        res.status(500).send('server error');
        
    }

});

//route DELETE api/profile
//desc  delete profile,user and posts
// private

router.delete('/',auth,async(req,res)=>{

    try {
        //@todo remove users posts
        // remove profile
         await Profile.findOneAndRemove({user:req.user.id});
         //will remove user
         await User.findOneAndRemove({_id:req.user.id});
        res.json({msg:'user removed'})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
        
    }

});

//route PUT api/profile/experience
//desc  add profile experience
// private

router.put('/experience',[auth,[check('title','title is required').not().isEmpty(),check('company','company is required').not().isEmpty(),check('from','from date is required').not().isEmpty()]],async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{title,company,location,from,to,current,description}=req.body;

    const newExp={title,company,location,from,to,current,description}


    try {
        const profile=await Profile.findOne({user:req.user.id});
      profile.experience.unshift(newExp);
       await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
        
    }


});

//DELETE  api/profile/experience/:exp_id
//@desc delete experience from profile
//@access private

router.delete('/experience/:exp_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        //get remove index

        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex,1);

        await profile.save();

        res.json(profile)
        
        
    } catch (error) {
        
    }

});

//@route PUT api/profile/education
//add education
router.put('/education',[auth,[check('school','school is required').not().isEmpty(),check('degree','degree is required').not().isEmpty(),check('fieldofstudy','field of study is required').not().isEmpty(),check('from','from date is required').not().isEmpty()]],async(req,res)=>{

    const errors=validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const{school,degree,fieldofstudy,from,to,current,description}=req.body;

    const newEdu={school,degree,fieldofstudy,from,to,current,description}


    try {
        const profile=await Profile.findOne({user:req.user.id});
      profile.education.unshift(newEdu);
       await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
        
    }


});

//DELETE  api/profile/education/:edu_id
//@desc delete education from profile
//@access private

router.delete('/education/:edu_id',auth,async(req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        //get remove index

        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex,1);

        await profile.save();

        res.json(profile)
        
        
    } catch (error) {
        
    }

});


//route GET api/profile/github/:username
//get user repo from github
//public


router.get('/github/:username',(req,res)=>{

    

    try {
        const options={uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
        method:'GET',
        headers:{'user-agent':'node.js'}
    
    
    
    }
    request(options,(error,response,body)=>{
        if(error) console.error(error);

        if(response.statusCode!==200){

         return   res.status(404).json({msg: 'no github profile found'})
        }

        res.json(JSON.parse(body));
    })

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')

        
    }
})












module.exports=router;