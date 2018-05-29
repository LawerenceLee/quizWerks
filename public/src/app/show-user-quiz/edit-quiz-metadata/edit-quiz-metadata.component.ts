import { UserHttpService } from "../../user-http.service";
import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-edit-quiz-metadata',
  templateUrl: './edit-quiz-metadata.component.html',
  styleUrls: ['./edit-quiz-metadata.component.css']
})
export class EditQuizMetadataComponent implements OnInit {
  errors = [];
  @Input() quiz = {
    category: [],
    questions: [{}],
    title: "",
    desc: "",
    questionCount: 0,
  }
  @Input() workingQuizMetadata = {
    editing: false,
    title: "",
    desc: "",
  }
  userId: string;
  constructor(
    private _httpService: UserHttpService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId')
  }

  resetPage() {
    this.workingQuizMetadata.title = "";
    this.workingQuizMetadata.desc = "";
    this.workingQuizMetadata.editing = false;
  }

  // Submitting Form
  updateMetadata(form: NgForm) {
    if (form.invalid) {
      return;
    }
    else {
      this.quiz.title = this.workingQuizMetadata.title;
      this.quiz.desc = this.workingQuizMetadata.desc;
      this._httpService.putQuiz(this.userId, this.quiz['_id'], this.quiz)
        .subscribe(data => {
          if (data["message"] === "error") { 
            for (let err of data['error']) {
              this.errors.push(err)
            }
          }
          else { 
            this.resetPage();
            this.quiz = data['data'];
          }
        })
    }
  }

  deleteQuiz() {
    this._httpService.deleteQuiz(this.userId, this.quiz['_id'])
      .subscribe(data => {
        if (data["message"] === "error") { 
          for (let err of data['error']) {
            this.errors.push(err)
          }
        }
        else { 
          this._router.navigate([`/${localStorage.getItem('username')}/quizzes`])
        }
      })
  }

}
