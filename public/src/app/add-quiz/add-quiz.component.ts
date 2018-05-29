import { QuizHttpService } from "../quiz-http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  errors = [];
  newQuiz = {
    title: "",
    desc: "",
    category: "",
    questions: []
  };
  newQuestion = {
    question: "",
    correctAnswer: "",
    altAnswer1: "",
    altAnswer2: "",
    altAnswer3: "",
  }

  constructor(
    private _httpService: QuizHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  createQuiz(quizform: NgForm) {
    this.errors = [];
    if (quizform.invalid) { 
      return;
    }
    else {
      this.newQuiz.questions.push(this.newQuestion)
      this.newQuiz['ownerId'] = localStorage.getItem('userId')
      this._httpService.postQuiz(this.newQuiz)
        .subscribe(data => {
          if (data["message"] === "error") { 
            for (let err of data['error']) {
              this.errors.push(err)
            }
            this.newQuiz.questions = [];
          }
          else { this._router.navigate([`/${localStorage.getItem('username')}/quiz/${data['data']['_id']}`]); } 
        })
    }
  }


}
