let mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    startDate: {type: String},
    startTime: {type: String},
    quiz: {type: Object},
}, {timestamp: true})


mongoose.model("event", eventSchema)

