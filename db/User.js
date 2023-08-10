const mongoose = require('mongoose');
const validator = require("email-validator");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:String,

    email:{
        type:String,
        required : true,
        unique: true,
        validate:function(){
            return (
                validator.validate(this.email));
        }
        
    },
    
    password:String,

    confirmpassword:{
        type:String,
        required: true,
        validate:function(){
            return(
                this.confirmpassword==this.password
            )
        }
    }

    
});

userSchema.pre('save',function(){
    this.confirmpassword= undefined
});

userSchema.pre('save', async function(next){
    // console.log("hi from inside");
if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password , 12);    
}
next();
});


// userSchema.pre('save', async function(next){
//     const saltRounds= 10;
//     try {
//        const salt= await bcrypt.genSalt(saltRounds)
//        const hashedpassword = await bcrypt.hash(this.password, salt);
//        this.password = hashedpassword;
//        next()

//        console.log(this.email, {HashedPasswprd:this.password});
        
//     } catch (error) {
//         next(error)
//     }
// });



module.exports = mongoose.model("users" , userSchema);
