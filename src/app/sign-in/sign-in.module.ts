import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in.component';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {path: '', component: SignInComponent},
];

@NgModule({
  declarations: [SignInComponent],
  imports: [RouterModule.forChild(routes), FlexLayoutModule]
})
export class SignInModule { }
