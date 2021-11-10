const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
UserSchema.plugin(passportLocalMongoose);
//passport username,password fieldlarını kendi oluşturuyor
//öğrenme açısından iyi değil ama harika bir tool

module.exports=mongoose.model('User',UserSchema);