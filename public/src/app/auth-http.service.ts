import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({
    providedIn: "root"
})

export class AuthHttpService {

    constructor(private _http: HttpClient,
                private _router: Router) {}

    registerUser(userObj) {
        return this._http.post("/api/users", userObj)
    }

    loginUser(loginAttempt) {
        return this._http.post("/api/login", loginAttempt);
    }

    loggedIn() {
        // Returns true if token is present
        return !!localStorage.getItem('token')
    }

    logoutUser() {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')
        this._router.navigate(['/quizzes'])
    }

    getToken() {
        return localStorage.getItem('token')
    }

}

