import { UserHttpService } from "./user-http.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AuthHttpService } from "./auth-http.service"
import * as socketIo from 'socket.io-client'

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit{
    users = [];
    editedUser = { };
    newUser = { };
    signedInUsername: string;

    constructor(
        private _httpService: AuthHttpService,
        private _route: ActivatedRoute,
        private _router: Router
    ){}

    ngOnInit(): void {
        this.signedInUsername = localStorage.getItem('username')
        const socket = socketIo('http://localhost:3000');

        socket.on('hello', data => {
            console.log(data);
        })
    }


}