const { response } = require('express')
const Users = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userControllers= {
    register: async(req,res)=>{
       try{ 
        const {name,email,password} = req.body;
        const user = await Users.findOne({email});
        if(user) return res.status(400).json({msg:'Email already exists!'});
        if(password.length < 6) return res.status(400).json({msg:'Password must be at least 6 characters long'});
        
        const passwordHash = await bcrypt.hash(password,10)
        const newUser = await Users.create({name,email,password:passwordHash})
        
        //create jsonwebtoken to authenticate
        const accesstoken = createAccessToken({id:newUser._id}) 
        const refreshtoken = createRefreshToken({id:newUser._id})

        res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            path:'user/refresh_token'
        })

        
        res.json({accesstoken})
        //res.status(200).json({msg:'Register success!'})
    }catch (err){
        return res.status(500).json({msg:err.message})
    }
},
    refreshToken:(req,res)=>{
        try{
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please login or register"})
            
            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECRECT,(err,user)=>{
                if(err) return res.status(400).json({msg:'Please login or register!'})
                const accesstoken = createAccessToken({id:user.id})
                res.json({user,accesstoken})
            })
            }
        catch (err){
            return res.status(500).json({msg:err.message})
        }
    },
    login: async(req,res)=>{
        try{
            const {email,password} = req.body;
            const user = await Users.findOne({email});
            if(!user) return res.status(400).json({msg:'User does not exists'})

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({msg:'Incorrect password'})

            const accesstoken = createAccessToken({id:user._id})
            const refreshtoken = createRefreshToken({id:user._id})

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'user/refresh_token'
            })
            res.json({accesstoken})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    logout:async(req,res)=>{
        try{
            res.clearCookie('refreshtoken',{path:'user/refresh_token'});
            return res.json({msg:"Logged out"})
        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getuser:async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id).select('-password');
            if(!user) return res.status(400).json({msg:'User does not exist'})
            res.json(user)

        }catch(err){
            return res.status(500).json({msg:err.message})

        }
    },
    addcart:async(req,res)=>{
        try{
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg:"user does not exist"})

            await Users.findOneAndUpdate({_id:req.user._id},{
                cart:req.body.cart
            })
            return res.json({msg:"Added to cart"})

        }catch{
            return res.status(500).json({msg:err.message})
        }
    }
}

const createAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRECT,{expiresIn:'1d'})
}

const createRefreshToken = (user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRECT,{expiresIn:'7d'})
}

module.exports =userControllers