const express=require("express");
const router=express.Router();
const donors=require("../models/donorSchema");
//user registration
router.post("/register",async(req,res)=>{
    //validating the form
    //console.log(req.body);
    const {name,email,aadhar,password,gender,age,weight,bloodgroup,phno,state,city,disease} = req.body;

    //if users miss any fields
    if(!name || !email || !aadhar || !password || !gender || !age || !weight || !bloodgroup || !phno || !state || !city || !disease){
        return res.status(404).json("Please fill all the fields");
    }

    try{
        const preuser = await donors.findOne({aadhar:aadhar}) //checking the email with users db emails
        console.log(preuser); //if user not present it shows null

        if(preuser){
            return res.status(404).json("Already registered");
        }else{
            const adduser = new donors({
                name,email,aadhar,password,gender,age,weight,bloodgroup,phno,state,city,disease
            });

            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser);
        }

    }catch(error){
        res.status(404).json(error);
    }
})

//get userdata for list page
router.get("/getdata",async(req,res)=>{
    try{
        const userdata=await donors.find();
        res.status(201).json(userdata);
        console.log(userdata);
    }catch(error){
        res.status(404).json(error);
    }
})


//delete userdata
router.delete("/deleteuser/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteuser=await donors.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    }catch(error){
        res.status(422).json(error);
    }
})

//find a particular user for update 
router.get("/getuser/:id",async(req,res)=>{
    try{
        console.log(req.params);
        const {id} = req.params;
        const user= await donors.findById({_id:id});
        console.log(user);
        res.status(201).json(user)
    } catch(error){
        res.status(422).json(error)
    }
})

//update user data
router.patch("/updateuser/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const updateduser = await donors.findByIdAndUpdate(id,req.body,{
            new:true
        });
        console.log(updateduser);
        res.status(201).json(updateduser);
    }catch(error){
         res.status(422).json(error);
    }
})

//check user data for login page
router.post('/checkdonor', async(req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    

    if(!email || !password)
    {
        return res.status(422).json({error:"Please fill all the fields carefully"});
    }
    try
    {
        const emailExist= await donors.findOne({email:email});
        if(emailExist)
        {
            if(password == emailExist.password)
            return res.status(200).json({id:emailExist._id});
            else
            return res.status(422).json({error:"Incorrect Password"});
        }
        else{
            return res.status(422).json({error:"Incorrect email"});
        }
    }
    catch(err)
    {
        return res.status(422).json({error:"Error!"});
    }
})

router.post("/sendmail/:id",async(req,res)=>{
    //console.log(req.body);
    var nodemailer=require('nodemailer');
    var msg=`Hey,Iam ${req.body.name}! Iam in urgent need of plasma due to ${req.body.purpose}.
    \nIf you are available to donate your plasma,kindly contact me on this number ${req.body.contact}.
    \nThankyou in advance!`;
    
    try{
        const {id} = req.params;
        const user= await donors.findById({_id:id});
        console.log(user);
        var transporter=nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user:'bepositiveplasmadonation@gmail.com',
                pass:'llmmdslsuemcxfos',
            }
        });
        
        var mailOptions={
            from:'bepositiveplasmadonation@gmail.com',
            to: user.email,
            subject:'Requirement for plasma donation',
            text: msg
        };
        
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error);
                transporter.close();
                return res.status(422).json({error:"Error!"});
            }else{
                transporter.close();
                console.log('Email sent: '+info.response);
                return res.status(200).json({id:emailExist._id});
            }
        });
    }
    catch(err){
        console.log(err);
    }
})
module.exports=router;
