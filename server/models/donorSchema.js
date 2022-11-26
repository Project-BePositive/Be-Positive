const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        aadhar:{
            type:Number,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true,
        },
        age:{
            type:Number,
            required:true,
        },
        weight:{
            type:Number,
            required:true,
        },
        bloodgroup:{
            type:String,
            required:true,
        },
        phno:{
            type:Number,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        disease:{
            type:String,
            required:true
        }
    }
);

const donors = mongoose.model("donors",donorSchema);  //donors-collection name
module.exports=donors;
