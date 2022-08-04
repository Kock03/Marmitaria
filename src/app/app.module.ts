import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FoodListComponent } from './food-list/food-list.component';
import { LunchListComponent } from './lunch/lunch-list/lunch-list.component';
import { FoodListEditionComponent } from './food-list/food-list-edition/food-list-edition.component';
import { LunchDetailsComponent } from './lunch/lunch-details/lunch-details.component';
import { LunchComponent } from './lunch/lunch.component';
import { LunchItemComponent } from './lunch/lunch-list/lunch-item/lunch-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { LunchListDialogComponent } from './lunch/lunch-list/lunch-list-dialog/lunch-list-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FoodListComponent,
    LunchListComponent,
    FoodListEditionComponent,
    LunchDetailsComponent,
    LunchComponent,
    LunchItemComponent,
    DropdownDirective,
    LunchListDialogComponent

  ],
  entryComponents: [LunchListDialogComponent],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
