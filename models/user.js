const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdEvents:[
        {
            type: Schema.Types.ObjectId,
            ref: "event"
        }
    ]
});

module.exports = mongoose.model("user", userSchema);