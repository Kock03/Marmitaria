import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  },

];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    RouterModule.forChild(routes), FlexLayoutModule, CommonModule, MatIconModule
  ]
})
export class ForgotPasswordModule { }
