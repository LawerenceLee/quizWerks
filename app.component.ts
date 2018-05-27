
import { HttpService } from "./http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
    users = [];
    editedUser = { };
    newUser = { };

    constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit() {
        this.getUsers()
    }

    // GET ALL users
    getUsers() {
        this._httpService.getUsers().subscribe(data => {
            if (data["message"] === "error") { console.log(data["error"]) }
            else { this.users = data["data"] };
        })
    }

    // AFTER SUMBIT, SEND NEW user TO SERVER TO BE CREATED
    onSubmit() {
        this._httpService.postUser(this.newUser).subscribe(data => {
            if (data["message"] === "error") { console.log(data["error"]) }
            else { this.getUsers(); this.newUser = { }; }
        })
    }

    // SET EDITEDuser TO THE user INDEX PASSED
    editUser(userIndex) {
        this.editedUser = this.users[userIndex];
    }

    // UPON SUBMISSION OF EDIT FORM, PASS EDITED user ALONG W/ ITS ID TO SERVICE
    onEdit() {
        this._httpService.putUser(this.editedUser["_id"], this.editedUser).subscribe(data => {
            if (data["message"] === "error") { console.log(data["error"]) }
            else { this.getUsers(); this.editedUser = { }; }
        })
    }

    // UPON CLICKING THE DELETE BUTTON, SEND _ID OF user TO SERVICE
    onDelete(userIndex) {
        this._httpService.deleteUser(this.users[userIndex]["_id"]).subscribe(data => {
            if (data["message"] === "error") { console.log(data["error"]) }
            else { this.getUsers(); }
        })
    }

}