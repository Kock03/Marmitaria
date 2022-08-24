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
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FileSelectDirective } from 'ng2-file-upload';


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
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatSlideToggleModule,
    FileSelectDirective
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
