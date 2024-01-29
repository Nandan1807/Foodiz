const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/fooddata", async (req, res) => {
    try {
        const Fetched_data = await mongoose.connection.db.collection("fooddata");
        const itemdata = await Fetched_data.find({}).toArray();
        const Food_cat = await mongoose.connection.db.collection("foodcatagories");
        const catagorydata = await Food_cat.find({}).toArray();
        res.send([itemdata, catagorydata])
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.post("/insertfooddata", async (req, res) => {
    try {
        const Fetched_data = await mongoose.connection.db.collection("fooddata");
        const Food_cat = await mongoose.connection.db.collection("foodcatagories");
        const result = await Food_cat.findOne({ CategoryName: req.body.CategoryName })
        if (!result) {
            await Food_cat.insertOne({
                CategoryName: req.body.CategoryName
            }
            )
        }

        await Fetched_data.insertOne({
            CategoryName: req.body.CategoryName,
            name: req.body.name,
            img: req.body.img,
            options: req.body.options,
            description: req.body.description
        })
        res.json({ success: true });

    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

router.get("/getonefooddata/:id", async (req, res) => {
    try {
        const Fetched_data = await mongoose.connection.db.collection("fooddata");
        const result = await Fetched_data.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}
)

router.delete("/deletefooddata/:id", async (req, res) => {
    try {
        const Fetched_data = await mongoose.connection.db.collection("fooddata");
        const result = await Fetched_data.deleteOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}
)

router.put("/updatefooddata/:id", async (req, res) => {
    try {
        const Fetched_data = await mongoose.connection.db.collection("fooddata");
        const Food_cat = await mongoose.connection.db.collection("foodcatagories");

        // Validate input data
        const { CategoryName, name, img, options, description } = req.body;
        if (!CategoryName || !name || !img || !options || !description) {
            return res.status(400).json({ error: 'Invalid input data' });
        }

        // Check if the category exists, if not, insert it
        const result = await Food_cat.findOne({ CategoryName });
        if (!result) {
            await Food_cat.insertOne({ CategoryName });
        }

        // Update the food record
        const data = await Fetched_data.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(req.params.id) },
            { $set: { CategoryName, name, img, options, description } },
            { new: true }
        );

        if (!data) {
            return res.status(404).json({ error: 'Food record not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

module.exports = router;