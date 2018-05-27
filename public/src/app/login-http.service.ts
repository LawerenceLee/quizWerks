import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class LoginHttpService {

    constructor(private _http: HttpClient) {}

    login(loginAttempt) {
        return this._http.post("/api/login", loginAttempt);
    }

    logout() {
        return this._http.get(`/api/logout`)
    }
}

