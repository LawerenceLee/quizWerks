import { QuizHttpService } from "../quiz-http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { AppComponent } from "../app.component"

@Component({
  selector: 'all-user-quizzes',
  templateUrl: './all-quizzes.component.html',
  styleUrls: ['./all-quizzes.component.css']
})
export class AllQuizzesComponent implements OnInit {
  quizzes: any[];
  errors = [];
  username = null;

  constructor(
    private _httpService: QuizHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userId')) this.username = localStorage.getItem('username')
    this._httpService.getQuizzes()
      .subscribe(data => {
        if (data["message"] === "error") { 
          for (let err of data['error']) {
            this.errors.push(err);
          }
        }
        if (data['data']) {
          this.quizzes = data["data"]
        };
      })
  }

  showQuiz(quizId) {
    if (!this.username) this._router.navigate([`/quiz/${quizId}`])
    else this._router.navigate([`/${this.username}/quiz/${quizId}`])
  }
}
