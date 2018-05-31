import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})

export class QuizHttpService {

    constructor(private _http: HttpClient) {}

    getQuizzes() {
        return this._http.get("/api/quizzes");
    }

    getQuiz(quizId) {
        return this._http.get(`/api/quizzes/${quizId}`)
    }

    postQuiz(quizObj) {
        return this._http.post("/api/quizzes", quizObj)
    }

    putQuiz(quizId, quizObj) {
        return this._http.put(`/api/quizzes/${quizId}`, quizObj)
    }
    
    deleteQuiz(quizId) {
        return this._http.delete(`/api/quizzes/${quizId}`)
    }

}

