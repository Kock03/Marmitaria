import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LunchReviewDialogComponent } from './lunch/lunch-details/lunch-review-dialog/lunch-review-dialog.component';
import { ToDoListComponent } from './dashboard/to-do-list/to-do-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-adress', component: VerifyEmailComponent, canActivate: [AuthGuard]},
  {path: 'review', component: LunchReviewDialogComponent, canActivate: [AuthGuard]},
  {path: 'to-do-list', component: ToDoListComponent, canActivate: [AuthGuard]},
  {path: 'request', component: PaymentFormComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
