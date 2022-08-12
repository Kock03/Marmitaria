import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LunchDetailsDialogComponent } from './lunch/lunch-details/lunch-details-dialog/lunch-details-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatPaginator} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card'


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
    LunchListDialogComponent,
    LunchDetailsDialogComponent

  ],
  entryComponents: [LunchListDialogComponent, LunchDetailsDialogComponent],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatPaginatorModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
