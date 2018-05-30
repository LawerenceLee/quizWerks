const mongoose = require("mongoose");
const Quizzes = mongoose.model("quiz");

quizValidation = quiz => {
    let errors = [];
    // Quiz title validations
    if (quiz['title'] === "") {
        errors.push("Quiz title may not be blank.")
    }
    else if (quiz['title'].length <= 3) {errors.push("Quiz title must be at least 3 characters long")}
    // Quiz Desc validations

    if (quiz['desc'] === "") {
        errors.push("Quiz description may not be blank.")
    }
    else if (quiz['desc'].length <= 10) {errors.push("Quiz description must be at least 10 characters long")}
    
    if (!quiz['questions']) {errors.push("You must create at least one question for your quiz")}
    for (let question of quiz['questions']) {
        // correct answer must be among alternate answer choices
        if (question['question'] === "") { errors.push("Question may not be blank.") } 
        if (question['altAnswer1'] === "") {
            errors.push("Alternate Answer 1 cannot be blank")
        }
        else if (question['altAnswer1'] === question['correctAnswer']) {
            errors.push("Alternate Answer 1 cannot be the same as the Correct Answer")
        }

        if (question['altAnswer2'] === question['correctAnswer']) {
            errors.push("Alternate Answer 2 cannot be the same as the Correct Answer")
        }
        if (question['altAnswer3'] === question['correctAnswer']) {
            errors.push("Alternate Answer 3 cannot be the same as the Correct Answer")
        }
    }
    return errors
}

returnObjBuilder = (res) => {
    return (err, data) => {
        if (err) return res.json({message: 'error', error: [err.message]});
        else return res.json({message: "success", data: data});
    }
}
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
