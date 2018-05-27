import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { LoginHttpService } from "../login-http.service";
import { NgForm } from "@angular/forms"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors = [];
  loginAttempt = {
    email: "",
    password: "",
  }

  constructor(
    private _httpService: LoginHttpService,
    private _route: ActivatedRoute,
    private _router: Router){}

  ngOnInit() {
  }

  tryLogin(form: NgForm) {
    this.errors = [];
    if (form.invalid) {
      return;
    }
    else {
      this._httpService.login(this.loginAttempt)
        .subscribe(data => {
          if (data['message'] === 'error') {
            for (let err of data['error']) {
              this.errors.push(err);
            }
          }
          else {
            localStorage.setItem('token', data['token']);
            // this._router.navigate(["/all"])
          }
        })

    }
  }


}
