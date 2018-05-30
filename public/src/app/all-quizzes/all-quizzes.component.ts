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

  constructor(
    private _httpService: QuizHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
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
    let username = localStorage.getItem('username');
    if (!username) this._router.navigate([`/quiz/${quizId}`])
    else this._router.navigate([`/${username}/quiz/${quizId}`])
  }
}
