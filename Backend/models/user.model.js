import mongoose from "mongoose";
import bcrypt from "bcrypt" 
import jwt from "jsonwebtoken"


const userschema = new mongoose.Schema({
    fullname:{
        firstname :{
            type:String,
            required:true , 
            minlength : [3, 'First name must be at least 3 characters long'] 
        },
        lastname:{
            type:String,
            minlength : [3, 'Last name must be at least 3 characters long']
            }

    },
    email:{
        type:String ,
        required:true,
        unique:true 
    },
    password:{
        type:String ,
        required:true ,
        select : false 
        
    } , 
    socketID :{
        type:String ,
     
    }


} , 
{
    timestamps: true
})

userschema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();

})

userschema.methods.comparepassword =  async function(password){
    return await bcrypt.compare(password , this.password);
} 

userschema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        _id:this._id ,
        
        } , 
        process.env.ACCESS_TOKEN_SECRET , 
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
)
}
userschema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
        _id:this._id ,
        
        } , 
        process.env.REFRESH_TOKEN_SECRET , 
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
)
}

export const User = mongoose.model('User', userschema);