//import express from "express";
var express=require("express");
import Donor from "../model.js";
const donor=express.Router();

donor.get('/getdonors',async(req,res)=>{
    try{
        const donor=await Donor.find(req.query);
        res.status(200).json(donor);
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: err.msg})
    }
})

donor.post('/checkdonor',async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    if(!username || !password){
        return res.status(422).json({
            error:"Please fill all the fields carefully"
        });
    }
    try{
        const usernameExist=await Donor.findOne({username:username});
        if(usernameExist){
            if(password==usernameExist.password)
                return res.status(200).json({id:usernameExist._id});
            else
                return res.status(422).json({error:"Incorrect Password"});
        }
    }
    catch(err){
        return res.status(422).json({error:"Incorrect Username"});
    }
})

donor.post('/updatedonor',async(req,res)=>{
    const username=req.body.username;
    const newage=req.body.age;
    const newbloodgroup=req.body.bloodgroup;
    const newweight=req.body.bloodgroup;
    const newphone=req.body.phone;
    const newstate=req.body.state;
    const newcity=req.body.city;

    if(!username || !newage || !newbloodgroup || !newweight || !newphone || !newstate || !newcity){
        return res.status(422).json({error:"Please fill all the fields carefully"});
    }
    try{
        const usernameExist=await Donor.findOne({username:username});
        if(usernameExist){
            usernameExist.age=newage;
            usernameExist.bloodgroup=newbloodgroup;
            usernameExist.weight=newweight;
            usernameExist.phone=newphone;
            usernameExist.state=newstate;
            usernameExist.city=newcity;
            usernameExist.save();
            res.json({"status":"form submitted"});
        }
        else{
            return res.status(422).json({error:"Incorrect Username"});
        }
    }
    catch(err){
        console.log(err);
    }
})

donor.delete('/deletedonor/:id',async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    await Donor.findByIdAndRemove(id).exec();
    res.status(200).json({msg:"User deleted successfully"})
})

donor.post('/createdonor',async(req,res)=>{
    console.log(req.body);
    
    const name=req.body.name;
    const username=req.body.username;
    const password=req.body.password;
    const gender=req.body.gender;
    const age=req.body.age;
    const bloodgroup=req.body.bloodgroup;
    const weight=req.body.weight;
    const phone=req.body.phone;
    const state=req.body.state;
    const city=req.body.city;

    if(!name || !username || !password || !gender || !age || !bloodgroup || !weight || !phone || !state || !city){
        return res.status(422).json({error:"Please fill all the fields carefully"});
    }
    try{
        const usernameExist=await Donor.findOne({username:username});
        if(usernameExist){
            return res.status(422).json({error:"Sorry,username already exists"});
        }
        const phoneExist=await Donor.findOne({phone:phone});
        if(phoneExist){
            return res.status(422).json({error:"User already exists with this contact number"});
        }
        else{
            const newDonor=new Donor({
                name,username,password,gender,age,bloodgroup,phone,state,city
            })
            await newDonor.save();
            res.json({"status":"form submitted"});
        }
    }
    catch(err){
        console.log(err);
    }
})

export default donor;