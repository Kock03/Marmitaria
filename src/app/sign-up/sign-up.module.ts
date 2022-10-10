import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';



const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  },

];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    RouterModule.forChild(routes), MatSlideToggleModule, FlexLayoutModule
  ]
})
export class SignUpModule { }
