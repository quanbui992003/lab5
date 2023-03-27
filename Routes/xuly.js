const express = require('express');
const baiTap = require('../model/bt')
const app = express();

app.get("/",(req , res) =>{
    res.render("nhapdata")
})

app.post("/adddata" , async (req  , res) =>{
    try {
        const data = new baiTap(req.body);
        if(data){
            await data.save()
            res.redirect("/data/getAllData")
        }else{
            console.log("Error saving")
        }
    } catch (error) {
        console.log(error)
    }
   
})  

app.get("/getAllData" , async (req  ,res) =>{
    try {
        await baiTap.find({})
        .then(datas =>{
            res.render("docdata",{
                datas: datas.map(data => data.toJSON())
            })
          
        })
    } catch (error) {
        res.status(500).console(error)
    }
})



module.exports = app;