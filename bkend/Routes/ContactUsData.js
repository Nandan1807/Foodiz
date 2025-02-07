const express = require("express");
const router = express.Router();
const contact = require("../models/Contact");

router.post('/contactUsData', async (req, res) => {
    let data = req.body.feedback_data
    await data.splice(0,0,{Feedback_date:req.body.feedback_date})

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await contact.findOne({ 'email': req.body.email })
    if (eId===null) {
        try {
            await contact.create({
                email: req.body.email,
                feedback_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await contact.findOneAndUpdate({email:req.body.email},
                { $push:{feedback_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
});


router.get('/allContactUsData' ,async (req, res) => {
    try {
        let eId = await contact.find({})
        //console.log(eId)
        res.send(eId)
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;