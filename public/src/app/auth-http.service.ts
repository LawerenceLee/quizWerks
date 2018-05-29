import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class AuthHttpService {

    constructor(private _http: HttpClient) {}

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

    getToken() {
        return localStorage.getItem('token')
    }

    // logout() {
    //     return this._http.get(`/api/logout`)
    // }
}

