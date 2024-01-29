const express = require("express");
const router = express.Router();
const user = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtsecret = "Mynameisnandanjoshifromrajkotgujratindia"

router.post("/createuser",
    body('email', "Incorrect Email").isEmail(),
    body("name", "Incorrect Username").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 })
    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const salt = await bcrypt.genSalt(10);
        let securepass = await bcrypt.hash(req.body.password, salt);

        try {
            await user.create({
                name: req.body.name,
                location: req.body.location,
                password: securepass,
                email: req.body.email
            })
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })

router.post("/loginuser",
    body('email', "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            let result = await user.findOne({
                email: req.body.email
            })
            if (!result) {
                return res.status(400).json({ errors: "Password or email is incorrect" });
            }

            const passCmp = await bcrypt.compare(req.body.password, result.password);

            if (!passCmp) {
                return res.status(400).json({ errors: "Password or email is incorrect" });
            }

            const data = {
                enduser: {
                    id: result.id
                }
            }

            const authtoken = jwt.sign(data, jwtsecret);

            return res.json({ success: true, authtoken: authtoken });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })
module.exports = router;