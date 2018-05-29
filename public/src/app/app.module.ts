import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserHttpService } from "./user-http.service";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { RegistrationComponent } from "./registration/registration.component"
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AuthHttpService } from "./auth-http.service";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
import { QuizHttpService } from "./quiz-http.service";
import { AllQuizzesComponent } from "./all-quizzes/all-quizzes.component";
import { UserQuizzesComponent } from "./user-quizzes/user-quizzes.component";
import { AddQuizComponent } from "./add-quiz/add-quiz.component";
import { ShowUserQuizComponent } from "./show-user-quiz/show-user-quiz.component";
import { EditQuizMetadataComponent } from "./show-user-quiz/edit-quiz-metadata/edit-quiz-metadata.component";
import { QuestionFormComponent } from "./show-user-quiz/question-form/question-form.component";
import { ShowQuizComponent } from "./show-quiz/show-quiz.component";


@NgModule({
declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    AllQuizzesComponent,
    UserQuizzesComponent,
    AddQuizComponent,
    ShowUserQuizComponent,
    EditQuizMetadataComponent,
    QuestionFormComponent,
    ShowQuizComponent,
],
imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
],
providers: [UserHttpService, QuizHttpService, AuthHttpService, AuthGuard,
{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true,
}],
bootstrap: [AppComponent]
})
export class AppModule { }