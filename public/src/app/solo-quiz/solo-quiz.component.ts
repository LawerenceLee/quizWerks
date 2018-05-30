import { Component, OnInit } from '@angular/core';
import { QuizHttpService } from "../quiz-http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-solo-quiz',
  templateUrl: './solo-quiz.component.html',
  styleUrls: ['./solo-quiz.component.css']
})
export class SoloQuizComponent implements OnInit {

  errors = []; 
  workingQuestion = {
    question: "",
    correctAnswer: "",
    answers: [],
  }
  quiz = {
    title: "",
    desc: "",
    questionCount: 0
  }
  currentAnswer
  correct = 0;
  incorrect = 0;
  timer = 10;
  quizRunning = false;
  quizFinished = false;
  
  constructor(
    private _httpService: QuizHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this._httpService.getQuiz(params['quizId'])
        .subscribe(data => {
          if (data["message"] === "error") { this.errors.push("That quiz Id does not exist") }
          else { 
            if (data['data'] !== null) this.quiz = data['data']; 
          }
        })
    });
  }


  startTimer() {
    let myTimer = setInterval(() => {
      this.timer -= 1;
      if (this.timer <= 0) {
        clearInterval(myTimer);

        if (this.quiz['questions'].length <= 0) this.quizFinished = true;
        else this.quizRunning = false;

        if (this.currentAnswer === this.workingQuestion.correctAnswer) {
          this.correct += 1;
        }
        else {this.incorrect += 1}
      }
    }, 1000);
  }

    shuffleAnswers() {
      let j, x, i;
      for (i=this.workingQuestion.answers.length-1; i>0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = this.workingQuestion['answers'][i];
        this.workingQuestion['answers'][i] = this.workingQuestion['answers'][j];
        this.workingQuestion['answers'][j] = x;
      }
    }

  loadQuestion() {
    let randNum = Math.floor(Math.random() * this.quiz['questions'].length)
    let questionUnit = this.quiz['questions'].splice(randNum, 1)[0]
    this.workingQuestion.question = questionUnit.question,
    this.workingQuestion.correctAnswer = questionUnit.correctAnswer,
    this.workingQuestion['answers'][0] = questionUnit.altAnswer1
    this.workingQuestion['answers'][1] = questionUnit.correctAnswer
    if (questionUnit.altAnswer3 !== "") this.workingQuestion['answers'][2] = questionUnit.altAnswer3;
    if (questionUnit.altAnswer2 !== "") this.workingQuestion['answers'][3] = questionUnit.altAnswer2;
    this.shuffleAnswers()
  }

  resetWorkingQuestion() {
  }
  
  nextQuestionBtn() {
    this.workingQuestion.answers = [];
    this.loadQuestion()
    this.currentAnswer = "";
    this.timer = 10;
    this.quizRunning = true;
    this.startTimer()
  }

  submitAnswer(answer) {
    this.currentAnswer = answer;
  }

}
