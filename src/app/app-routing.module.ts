import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LunchReviewDialogComponent } from './lunch/lunch-details/lunch-review-dialog/lunch-review-dialog.component';
import { ToDoListComponent } from './dashboard/to-do-list/to-do-list.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./sign-in/sign-in.module').then((m) => m.SignInModule),
  },
  {
    path: 'register-user',
    loadChildren: () =>
      import('./sign-up/sign-up.module').then((m) => m.SignUpModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'verify-email-adress',
    loadChildren: () =>
      import('./verify-email/verify-email.module').then(
        (m) => m.VerifyEmailModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'loader',
    loadChildren: () =>
      import('./loader/loader.module').then(
        (m) => m.LoaderModule
      ),
    // canActivate: [AuthGuard],
  },
  {
    path: 'review',
    component: LunchReviewDialogComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'to-do-list',
    component: ToDoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'request',
    component: PaymentFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
