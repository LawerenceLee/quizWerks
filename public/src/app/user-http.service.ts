import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class UserHttpService {

    constructor(private _http: HttpClient) {}

    // getUsers() {
    //     return this._http.get("/api/users");
    // }

    // getUser(userId) {
    //     return this._http.get(`/api/users/${userId}`)
    // }

    // putUser(userId, userObj) {
    //     return this._http.put(`/api/users/${userId}`, userObj)
    // }
    
    // deleteUser(userId) {
    //     return this._http.delete(`/api/users/${userId}`)
    // }

    // tested
    getUserQuizzes(userId) {
        return this._http.get(`/api/users/${userId}/quizzes`)
    }
    // tested
    getQuiz(userId, quizId) {
        return this._http.get(`/api/users/${userId}/quiz/${quizId}`)
    }

    postQuiz(quizObj) {
        return this._http.post("/api/users/${userId}/quiz/", quizObj)
    }
    
    putQuiz(userId, quizId, quizObj) {
        return this._http.put(`/api/users/${userId}/quiz/${quizId}`, quizObj)
    }
    
    deleteQuiz(userId, quizId) {
        return this._http.delete(`/api/users/${userId}/quiz/${quizId}`)
    }

}

