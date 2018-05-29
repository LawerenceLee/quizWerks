import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from "./registration/registration.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard"
import { AllQuizzesComponent } from "./all-quizzes/all-quizzes.component"
import { UserQuizzesComponent } from "./user-quizzes/user-quizzes.component"
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ShowUserQuizComponent } from './show-user-quiz/show-user-quiz.component'
import { ShowQuizComponent} from './show-quiz/show-quiz.component'

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: ':username/quiz/:quizId', component: ShowUserQuizComponent, canActivate: [AuthGuard] },
  { path: ':username/quizzes', component: UserQuizzesComponent, canActivate: [AuthGuard] },
  { path: 'quizzes', component: AllQuizzesComponent},
  { path: 'quiz/new', component: AddQuizComponent, canActivate: [AuthGuard]},
  { path: 'quiz/:quizId', component: ShowQuizComponent},

  // { path: 'user', component: UserView, canActivate: [AuthGuard]}

  { path: '', pathMatch: 'full', redirectTo: "/quizzes" },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
