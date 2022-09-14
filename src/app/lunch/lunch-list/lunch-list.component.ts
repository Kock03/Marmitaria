import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';



@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LunchListComponent implements OnInit {
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
    },{
    eid: 'e102',
    ename: 'ram',
    esal: 2000
    },{
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
    }];
  @Output() packageWasSelected = new EventEmitter<Lunch>();
  packages: Lunch[] = [];

  method!: string;
  index!: any;
  filter!: string;
  packageEx: any;
  users!: any;
  usersEx!: any;
  inputMode: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private firestore: AngularFirestore,
    private excelService: ExcelService
  ) {}

  async ngOnInit() {
    let hiddenList = document.getElementById('list') as HTMLDivElement;
    let hiddenButton = document.getElementById('button') as HTMLDivElement;
    let block = document.getElementById('load') as HTMLDivElement;
    let search = document.getElementById('search') as HTMLDivElement;
    setTimeout(() => {
      hiddenList.style.display = 'block';
      hiddenButton.style.display = 'block';
      search.style.display = 'block';
      block.style.display = 'none';
    }, 5000);
    this.firestore
      .collection('lunch')
      .snapshotChanges()
      .subscribe(async (data) => {
        this.packageEx = data.map((e) => {
          return {
            id: e.payload.doc.id,
            datas: e.payload.doc.data(),
          };
        });
        this.packages = this.packageEx;
    });
    let user =  JSON.parse(localStorage.getItem("user")!);
    user.uid === "yKPp5y7Yx4bYd8u1GM37HHeIcP32" ? this.inputMode = true : this.inputMode = false;
  }

  onPackageSelected(packageSelected: any) {
    sessionStorage.setItem('index', packageSelected.id);
    this.packageWasSelected.emit(packageSelected.datas);
  }

  onDelete(result_id: any) {
    this.firestore.doc('lunch/' + result_id).delete();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LunchListDialogComponent, {
      data: this.packages,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let i = this.packageEx.findIndex((value: any) => 
          value.datas.description === result.description && value.datas.name === result.name
        );
        if (i === -1) {
          this.firestore.collection('lunch').add(result);
        } else {
          this._snackBar.open('Produto já cadastrado!', 'Fechar');
        }
      }
    });
  }

  exportAsXLSX():void{
    let result = JSON.parse(sessionStorage.getItem('lunch')!);
    console.log("🚀 ~ file: lunch-list.component.ts ~ line 109 ~ LunchListComponent ~ exportAsXLSX ~ let result", result)
    this.excelService.exportAsExcelFile(result, 'sample');
  }
}
