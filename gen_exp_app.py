import os

PROJ_NAME = ""
CONTROLLER_NAME = ""
MODEL_NAME = ""


def gen_folders():
    # os.system(f'mkdir -p ./{PROJ_NAME}/client/views')
    # os.system(f"mkdir -p ./{PROJ_NAME}/client/static")
    os.system(f"mkdir -p ./{PROJ_NAME}/server/config")
    os.system(f"mkdir -p ./{PROJ_NAME}/server/controllers")
    os.system(f"mkdir -p ./{PROJ_NAME}/server/models")


def build_mongoose():
    conf = """  
    const mongoose = require("mongoose");
    const fs = require("fs");
    const path = require("path");
    mongoose.connect(`mongodb://localhost/%(CONTROLLER_NAME)s`);

    let modelsPath = path.join(__dirname, "./../models");
    fs.readdirSync(modelsPath).forEach(function(file) {
        if(file.indexOf(".js") >= 0) {
            require(modelsPath + "/" + file);
        }
    }) """ % {'CONTROLLER_NAME': CONTROLLER_NAME}
    os.system(f"touch ./{PROJ_NAME}/server/config/mongoose.js")
    os.system(f"echo '{conf}' >> ./{PROJ_NAME}/server/config/mongoose.js")


def build_serverJS():
    serverJS = """
    const express = require("express");
    const app = express();
    const path = require("path")
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/client/views")
    app.use(express.static(__dirname + "/angular%(CONTROLLER_NAME_TITLE)s/dist/angular%(CONTROLLER_NAME_TITLE)s"))


    // Session
    let session = require("express-session");
    app.use(session({
        secret: "ai0nasd979YTUG:*PYsdaisdh;dspdi",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }))

    // Body Parser
    const bodyParser = require("body-parser");
    app.use(bodyParser.json());

    // Flash
    const flash = require("express-flash");
    app.use(flash());

    // Mongoose
    require("./server/config/mongoose")

    // Server
    const portNum = 8000;
    const server = app.listen(portNum, () => {
        console.log(`Listening on Port ${portNum}`);
    });

    // Routes
    require("./server/config/routes.js")(app)

    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("./angular%(CONTROLLER_NAME_TITLE)s/dist/angular%(CONTROLLER_NAME_TITLE)s/index.html"))
    });
    """ % {'CONTROLLER_NAME_TITLE': CONTROLLER_NAME.title()}
    # os.system(f"touch ./{PROJ_NAME}/server.js")
    os.system(f"echo '{serverJS}' >> ./{PROJ_NAME}/server.js")


def build_routes():
    routesJS = """
    const %(CONTROLLER_NAME)s = require("../controllers/%(CONTROLLER_NAME)s")
    module.exports = app => {
        app.get("/api/%(CONTROLLER_NAME)s", %(CONTROLLER_NAME)s.index);
        app.get("/api/%(CONTROLLER_NAME)s/:%(MODEL_NAME)sId", %(CONTROLLER_NAME)s.show)
        app.post("/api/%(CONTROLLER_NAME)s", %(CONTROLLER_NAME)s.create);
        app.put("/api/%(CONTROLLER_NAME)s/:%(MODEL_NAME)sId", %(CONTROLLER_NAME)s.update)
        app.delete("/api/%(CONTROLLER_NAME)s/:%(MODEL_NAME)sId", %(CONTROLLER_NAME)s.destroy)
    }
    """ % {'CONTROLLER_NAME': CONTROLLER_NAME, 'MODEL_NAME': MODEL_NAME}
    os.system(f"echo '{ routesJS }' >> ./{ PROJ_NAME }/server/config/routes.js")


def build_controller():
    controller = """
    const mongoose = require("mongoose");
    const %(CONTROLLER_NAME_TITLE)s = mongoose.model("%(MODEL_NAME)s");

    returnObjBuilder = (res) => {
        return (err, data) => {
            if (err) { res.json({ message: "error", error: err.message }) }
            else { res.json({ message: "success", data: data }) }
        }
    }

    module.exports = {
        index: (req, res) => {
            %(CONTROLLER_NAME_TITLE)s.find({}, returnObjBuilder(res))
        },
        show: (req, res) => {
            %(CONTROLLER_NAME_TITLE)s.findById(req.params.%(MODEL_NAME)sId, returnObjBuilder(res))
        },
        create: (req, res) => {
            %(CONTROLLER_NAME_TITLE)s.create(req.body, returnObjBuilder(res))
        },
        update: (req, res) => {
            %(CONTROLLER_NAME_TITLE)s.findByIdAndUpdate(req.params.%(MODEL_NAME)sId, req.body, returnObjBuilder(res))
        },
        destroy: (req, res) => {
            %(CONTROLLER_NAME_TITLE)s.findByIdAndRemove(req.params.%(MODEL_NAME)sId, returnObjBuilder(res))
        },
    }""" % {'CONTROLLER_NAME': CONTROLLER_NAME, 'MODEL_NAME': MODEL_NAME, 'CONTROLLER_NAME_TITLE': CONTROLLER_NAME.title(), 'MODEL_NAME_TITLE': MODEL_NAME.title()}
    os.system(f"echo '{ controller }' >> ./{ PROJ_NAME }/server/controllers/{ CONTROLLER_NAME }.js") 


def build_model():
    model = """
    let mongoose = require("mongoose");
    const %(CONTROLLER_NAME)sSchema = mongoose.Schema({
        title: {type: String, required: [true, "Title cannot be blank"]},
        desc: {type: String, default: ""},
        completed: {type: Boolean, default: false}
    }, {timestamp: true})
    mongoose.model("%(MODEL_NAME)s", %(CONTROLLER_NAME)sSchema)
    """ % {'CONTROLLER_NAME': CONTROLLER_NAME, 'MODEL_NAME': MODEL_NAME, 'CONTROLLER_NAME_TITLE': CONTROLLER_NAME.title(), 'MODEL_NAME_TITLE': MODEL_NAME.title()}
    os.system(f"echo '{ model }' >> ./{ PROJ_NAME }/server/models/{ MODEL_NAME }.js") 


def build_angular_service():
    service = """
    import { Injectable } from "@angular/core";
    import { HttpClient } from "@angular/common/http";

    @Injectable({
        providedIn: "root"
    })

    export class HttpService {

        constructor(private _http: HttpClient) {}

        get%(CONTROLLER_NAME_TITLE)s() {
            return this._http.get("/api/%(CONTROLLER_NAME)s");
        }

        get%(MODEL_NAME_TITLE)s(%(MODEL_NAME)sId) {
            return this._http.get(`/api/%(CONTROLLER_NAME)s/${%(MODEL_NAME)sId}`)
        }

        post%(MODEL_NAME_TITLE)s(%(MODEL_NAME)sObj) {
            return this._http.post("/api/%(CONTROLLER_NAME)s", %(MODEL_NAME)sObj)
        }

        put%(MODEL_NAME_TITLE)s(%(MODEL_NAME)sId, %(MODEL_NAME)sObj) {
            return this._http.put(`/api/%(CONTROLLER_NAME)s/${%(MODEL_NAME)sId}`, %(MODEL_NAME)sObj)
        }
        
        delete%(MODEL_NAME_TITLE)s(%(MODEL_NAME)sId) {
            return this._http.delete(`/api/%(CONTROLLER_NAME)s/${%(MODEL_NAME)sId}`)
        }

    }
    """ % {'CONTROLLER_NAME': CONTROLLER_NAME, 'MODEL_NAME': MODEL_NAME, 'CONTROLLER_NAME_TITLE': CONTROLLER_NAME.title(), 'MODEL_NAME_TITLE': MODEL_NAME.title()}
    os.system(f"echo '{ service }' >> ./{ PROJ_NAME }/http.service.ts") 


def build_angular_component():
    component = """
    import { HttpService } from "./http.service";
    import { Component, OnInit } from "@angular/core";
    import { ActivatedRoute, Params, Router } from "@angular/router";

    @Component({
        selector: "app-root",
        templateUrl: "./app.component.html",
        styleUrls: ["./app.component.css"]
    })
    export class AppComponent implements OnInit{
        %(CONTROLLER_NAME)s = [];
        edited%(MODEL_NAME_TITLE)s = { };
        new%(MODEL_NAME_TITLE)s = { };

        constructor(
            private _httpService: HttpService,
            private _route: ActivatedRoute,
            private _router: Router
        ){}

        ngOnInit() {
            this.get%(CONTROLLER_NAME_TITLE)s()
        }

        // GET ALL %(CONTROLLER_NAME)s
        get%(CONTROLLER_NAME_TITLE)s() {
            this._httpService.get%(CONTROLLER_NAME_TITLE)s().subscribe(data => {
                if (data["message"] === "error") { console.log(data["error"]) }
                else { this.%(CONTROLLER_NAME)s = data["data"] };
            })
        }

        // AFTER SUMBIT, SEND NEW %(MODEL_NAME)s TO SERVER TO BE CREATED
        onSubmit() {
            this._httpService.post%(MODEL_NAME_TITLE)s(this.new%(MODEL_NAME_TITLE)s).subscribe(data => {
                if (data["message"] === "error") { console.log(data["error"]) }
                else { this.get%(CONTROLLER_NAME_TITLE)s(); this.new%(MODEL_NAME_TITLE)s = { }; }
            })
        }

        // SET EDITED%(MODEL_NAME)s TO THE %(MODEL_NAME)s INDEX PASSED
        edit%(MODEL_NAME_TITLE)s(%(MODEL_NAME)sIndex) {
            this.edited%(MODEL_NAME_TITLE)s = this.%(CONTROLLER_NAME)s[%(MODEL_NAME)sIndex];
        }

        // UPON SUBMISSION OF EDIT FORM, PASS EDITED %(MODEL_NAME)s ALONG W/ ITS ID TO SERVICE
        onEdit() {
            this._httpService.put%(MODEL_NAME_TITLE)s(this.edited%(MODEL_NAME_TITLE)s["_id"], this.edited%(MODEL_NAME_TITLE)s).subscribe(data => {
                if (data["message"] === "error") { console.log(data["error"]) }
                else { this.get%(CONTROLLER_NAME_TITLE)s(); this.edited%(MODEL_NAME_TITLE)s = { }; }
            })
        }

        // UPON CLICKING THE DELETE BUTTON, SEND _ID OF %(MODEL_NAME)s TO SERVICE
        onDelete(%(MODEL_NAME)sIndex) {
            this._httpService.delete%(MODEL_NAME_TITLE)s(this.%(CONTROLLER_NAME)s[%(MODEL_NAME)sIndex]["_id"]).subscribe(data => {
                if (data["message"] === "error") { console.log(data["error"]) }
                else { this.get%(CONTROLLER_NAME_TITLE)s(); }
            })
        }

    }

    """ % {'CONTROLLER_NAME': CONTROLLER_NAME, 'MODEL_NAME': MODEL_NAME, 'CONTROLLER_NAME_TITLE': CONTROLLER_NAME.title(), 'MODEL_NAME_TITLE': MODEL_NAME.title()}
    os.system(f"echo '{ component }' >> ./{ PROJ_NAME }/app.component.ts") 


def build_angular_module():
    module = """
    import { BrowserModule } from "@angular/platform-browser";
    import { NgModule } from "@angular/core";
    import { HttpClientModule } from "@angular/common/http";
    import { HttpService } from "./http.service";
    import { FormsModule } from "@angular/forms";
    import { AppRoutingModule } from './app-routing.module';

    import { AppComponent } from "./app.component";

    @NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
    """
    os.system(f"echo '{ module }' >> ./{ PROJ_NAME }/app.component.ts") 


def main():
    gen_folders()
    build_mongoose()
    build_serverJS()
    build_routes()
    build_controller()
    build_model()
    build_angular_service()
    build_angular_component()
    build_angular_module()


if __name__ == '__main__':
    PROJ_NAME = input('Enter Project Name: ')
    CONTROLLER_NAME = input('Enter a Name for your main controller: ').lower()
    MODEL_NAME = input("Enter a Name for your main model: ").lower()
    main()
