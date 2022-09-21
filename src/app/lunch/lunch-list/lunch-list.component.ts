import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';
import * as XLSX from 'xlsx';


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
  fileName= 'Cardapio.xlsx';
  @Output() packageWasSelected = new EventEmitter<Lunch>();
  packages: Lunch[] = [];

  method!: string;
  index!: any;
  filter!: string;
  packageEx: any;
  users!: any;
  usersEx!: any;
  inputMode: boolean = false;
  amountBags: Array<any> = [];
  indexBags: Array<any> = [];
  valuesBags: Array<any> = [];

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
    let amountArray = packageSelected.datas.bagAmount;
    this.amountBags.push(amountArray);
    sessionStorage.setItem('arrayBag', JSON.stringify(this.amountBags));
    let bagIndex = sessionStorage.getItem('index');
    this.indexBags.push(bagIndex);
    sessionStorage.setItem('arrayBagIndex', JSON.stringify(this.indexBags));
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

  exportexcel(): void
  {
    /* pass here the table id */
    let result = JSON.parse(sessionStorage.getItem('lunch')!);
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
  }
}
