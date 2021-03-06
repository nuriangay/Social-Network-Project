const express=require('express')
const auth=require('../../middleware/auth')
const User=require('../../models/UserModel')
const jwt=require('jsonwebtoken')
const config=require('config')
const bcrypt=require('bcryptjs')

const {check,validationResult}=require('express-validator/check')

const router=express.Router();

// @route GET
//@desc 
// @access public
router.get('/',auth,async(req,res) =>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json({user})
        
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('server error')
        
    }
});
// @route POST api/auth
//@desc authenticate user and get token
// @access public
router.post('/', [


    
    check('email','please include a valid  email').isEmail(),
    check('password','password required').exists()

],async(req,res) =>{

    const errors =validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})

    }


    const {email,password}=req.body;

    try {

        let user=await User.findOne({email});

        if(!user){

         return   res.status(400).json({errors:[{msg:'Invalid credentials'}]})
        }
         //See if password match
    

    

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return   res.status(400).json({errors:[{msg:'Invalid credentials'}]})

        }


    //return jsonwebtoken

    const payload={user:{id:user.id}}

    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token)=>{
            if(err)throw err;
            res.json({token})

    })


    

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
        
    }

}
);



module.exports=router;