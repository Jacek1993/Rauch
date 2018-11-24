const _=require('lodash');
const express=require('express');


var {Client}=require('../models/Client');
var router=express.Router();
var {authenticate}=require('../auth');

router.post('/signup', async (req, res)=>{

    try{
        const body=req.body;
        var client=new Client(body);
        await client.save();
        console.log('Token');
        const token=await client.generateAuthToken();
        console.log('Token '+token);
        res.header('x-auth', token).send(client);
    }catch (e) {
        res.status(400).send(e);
    }
});


router.post('/login', async (req, res)=>{
    try{
        const body=req.body;

        const client =await Client.findByCredentials(body.email, body.password);
        console.log('token1243235');
        const token=await client.generateAuthToken();
        res.header('x-auth', token).send(client);
    }catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/logout',authenticate,  async (req, res)=>{
    try{
        // console.log(req.token);
        // console.log(req.client);
        await req.client.removeToken(req.token);
        res.status(200).send();
    }catch (e) {
        res.status(400).send(e);
    }
});

module.exports=router;