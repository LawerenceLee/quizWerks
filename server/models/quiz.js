let mongoose = require("mongoose");
const questionSchema = mongoose.Schema({
    question: {type: String},
    correctAnswer: {type: String},
    altAnswer1: {type: String},
    altAnswer2: {type: String},
    altAnswer3: {type: String},
})
const quizzesSchema = mongoose.Schema({
    ownerId: {type: String},
    title: {type: String},
    desc: {type: String},
    category: [],
    questions: [questionSchema],
    questionCount: {type: Number}
}, {timestamp: true})


mongoose.model("quiz", quizzesSchema)

