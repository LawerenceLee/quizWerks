import { UserHttpService } from "../user-http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { AppComponent } from "../app.component"

@Component({
  selector: 'all-user-quizzes',
  templateUrl: './user-quizzes.component.html',
  styleUrls: ['./user-quizzes.component.css']
})
export class UserQuizzesComponent implements OnInit {
  quizzes: any[];
  errors = [];
  signedInUsername: string;  

  constructor(
    private _httpService: UserHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.signedInUsername = localStorage.getItem('username');
    this._httpService.getUserQuizzes(localStorage.getItem('userId'))
      .subscribe(data => {
        if (data["message"] === "error") { 
          for (let err of data['error']) {
            this.errors.push(err);
          }
        }
        if (data['data']) {
          this.quizzes = data["data"];
        };
      })
  }

  showQuiz(quizId) {
    this._router.navigate([`/${localStorage.getItem('username')}/quiz/${quizId}`]);
  }

}
