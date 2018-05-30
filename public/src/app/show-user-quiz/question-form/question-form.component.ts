import { UserHttpService } from "../../user-http.service";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  errors: any[];
  @Input() workingQuestion;
  @Input() quiz; 

  constructor(
    private _httpService: UserHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  resetPage() {
    this.workingQuestion.editing = false;
    this.workingQuestion.questIdx = 0;
    this.workingQuestion.question = "";
    this.workingQuestion.correctAnswer = "";
    this.workingQuestion.altAnswer1 = "";
    this.workingQuestion.altAnswer2 = "";
    this.workingQuestion.altAnswer3 = "";
    this.workingQuestion.formType = ""; 
  }

  createOrUpdate(questionForm: NgForm) {
    this.errors = [];
    if (questionForm.invalid) { 
      return;
    }
    else {
      if (this.workingQuestion.formType === "Create Question") { this.createQuestion() }
      else { this.updateQuestion() };
    }
  }

  createQuestion() {
    const newQuest = {
      question: this.workingQuestion.question,
      correctAnswer: this.workingQuestion.correctAnswer,
      altAnswer1: this.workingQuestion.altAnswer1,
      altAnswer2: this.workingQuestion.altAnswer2,
      altAnswer3: this.workingQuestion.altAnswer3,
    }
    this.quiz.questions.push(newQuest)
    this.updateQuiz();
  }

  updateQuestion() {
    this.quiz.questions[this.workingQuestion.questIdx]['question'] = this.workingQuestion.question;
    this.quiz.questions[this.workingQuestion.questIdx]['correctAnswer'] = this.workingQuestion.correctAnswer;
    this.quiz.questions[this.workingQuestion.questIdx]['altAnswer1'] = this.workingQuestion.altAnswer1;
    this.quiz.questions[this.workingQuestion.questIdx]['altAnswer2'] = this.workingQuestion.altAnswer2;
    this.quiz.questions[this.workingQuestion.questIdx]['altAnswer3'] = this.workingQuestion.altAnswer3;
    this.updateQuiz();
  };

  updateQuiz() {
    this._httpService.putQuiz(localStorage.getItem('userId'), this.quiz['_id'], this.quiz)
      .subscribe(data => {
        if (data["message"] === "error") { 
          this.errors = data['error'];
        }
        else { 
          this.resetPage();
          this.quiz = data['data'];
          return;
        };
      });
  };


};
