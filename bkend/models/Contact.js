const mongoose = require("mongoose");
const {Schema} = mongoose;

const ContactSchema = new Schema({
    email:{
        type : String,
        required : true
    },
    feedback_data:{
        type : Array,
        required : true
    }
})

module.exports = mongoose.model("contact",ContactSchema);