const express = require('express');
const baiTap = require('../model/bt')
const app = express();

app.get("/", (req, res) => {
    res.render("nhapdata")
})
app.get("/cmhsp", (req, res) => {
    res.render("nhapdata")
})
app.put("/capnhat/:id", (req, res) => {
    console.log(req.params.id)
    console.log(req.body.name)
    baiTap.updateOne({ _id: req.params.id }, req.body)
        .then(() => res.redirect("/data/getAllData"))
        .catch(err => console.error(err))
})
app.post("/adddata", async (req, res) => {
    try {
        const data = new baiTap(req.body);
        if (data) {
            await data.save()
            res.redirect("/data/getAllData")
        } else {
            console.log("Error saving")
        }
    } catch (error) {
        console.log(error)
    }

})

app.get("/delete/:id", async (req, res) => {
    try {
        const users = await baiTap.findByIdAndDelete(req.params.id, req.body)
        
        if (!users) {
            res.status(404).send("no items found")
        } else {
            res.status(200).redirect("/data/getAllData")
        }
    } catch (error) {
        res.status(500).send(error);
    }
})


app.get("/getAllData", async (req, res) => {
    try {
        await baiTap.find({})
            .then(datas => {
                res.render("docdata", {
                    datas: datas.map(data => data.toJSON())
                })

            })
    } catch (error) {
        res.status(500).console(error)
    }
})
app.get("/edit/:id", async (req, res) => {
    try {
        const user = await baiTap.findById(req.params.id);
        res.render("update", {
            viewTitle: "update user",
            user: user.toJSON(),
        });
    } catch (err) {
        console.log(err);
    }
});



module.exports = app;