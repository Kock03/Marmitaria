import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { VerifyEmailComponent } from './verify-email.component';

const routes: Routes = [
  {path: '', component: VerifyEmailComponent},
];

@NgModule({
  declarations: [VerifyEmailComponent],
  imports: [RouterModule.forChild(routes), FlexLayoutModule, CommonModule],
})
export class VerifyEmailModule { }
