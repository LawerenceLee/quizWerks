import { QuizHttpService } from "../quiz-http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show-user-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {
  errors: any[];

  quiz = {
    category: [],
    questions: [{}],
    title: "",
    desc: "",
    questionCount: 0
  }

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

  


}
