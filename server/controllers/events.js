const mongoose = require("mongoose");
const Events = mongoose.model("event");

module.exports = {
    index: (req, res) => { // Tested
        const fieldsToReturn = ['_id', 'title', 'desc', 'questionCount', 'category']
        Quizzes.find({}, fieldsToReturn, (err, data) => {
            if (err) return res.json({message: 'error', error: err.message});
            else return res.json({message: "success", data: data});
        })
    },
    show: (req, res) => { // Tested
        // const fieldsToReturn = ['_id', 'title', 'desc', 'questions.question']
        Quizzes.findById(req.params.quizId, (err, data) => {
            if (err) return res.json({message: 'error', error: err.message});
            else return res.json({message: "success", data: data});
        })
    },
    create: (req, res) => {
        let errors = quizValidation(req.body);
        req.body.questionCount = req.body.questions.length;
        if (errors.length > 0) { res.json( { message: "error", error: errors } ) }
        else { 
            req.body.questionCount = req.body.questions.length;
            Quizzes.create(req.body, returnObjBuilder(res))
        };
    },
    update: (req, res) => {
        let errors = quizValidation(req.body);
        if (errors.length > 0) { res.json({ message: "error", error: errors }) }
        else {
            req.body.questionCount = req.body.questions.length;
            Quizzes.findByIdAndUpdate(req.params.quizId, req.body, {new: true}, (err, data) => {
                if (err) return res.json({message: 'error', error: err.message});
                else return res.json({message: "success", data: data});
            })
        };
    },
    destroy: (req, res) => {
        Quizzes.findByIdAndRemove(req.params.quizId, (err, data) => {
            if (err) return res.json({message: 'error', error: err.message});
            else return res.json({message: "success", data: data});
        }
    )}
}
