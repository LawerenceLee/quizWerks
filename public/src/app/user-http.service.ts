import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class UserHttpService {

    constructor(private _http: HttpClient) {}

    getUsers() {
        return this._http.get("/api/users");
    }

    getUser(userId) {
        return this._http.get(`/api/users/${userId}`)
    }

    postUser(userObj) {
        return this._http.post("/api/users", userObj)
    }

    putUser(userId, userObj) {
        return this._http.put(`/api/users/${userId}`, userObj)
    }
    
    deleteUser(userId) {
        return this._http.delete(`/api/users/${userId}`)
    }

}

