import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { UserHttpService } from "./user-http.service";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from "./registration/registration.component"
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent
],
imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
],
providers: [UserHttpService],
bootstrap: [AppComponent]
})
export class AppModule { }