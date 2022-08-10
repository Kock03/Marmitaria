import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css']
})
export class LunchListComponent implements OnInit {


  packages: Lunch[] = [
    new Lunch('Churrasco', 'Churrasco de Picanha', 'https://blog.santamassa.com.br/wp-content/uploads/2019/04/284199-churrasco-americano-e-brasileiro-voce-sabe-as-diferencas.jpg'),
    new Lunch('Sushi', 'Combo de Sushi Salmão', 'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2021/11/sushi.jpg'),
    new Lunch('Pastel de Carne', 'Pastel de Carne', 'https://receitatodahora.com.br/wp-content/uploads/2022/03/pastel-de-carne1.jpg')
  ];

  @Output() packageWasSelected = new EventEmitter<Lunch>();

  method!: string;
  index!: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onPackageSelected(packageSelected: Lunch){
    this.index = this.packages.findIndex((lunch) => packageSelected.description === lunch.description);
    sessionStorage.setItem('index', this.index.toString())
    this.packageWasSelected.emit(packageSelected);
  }

  onDelete(event: any){
    this.index = sessionStorage.getItem('index');
    this.packages.splice(this.index, 1);
  
  }

  openDialog(){
  const dialogRef = this.dialog.open(LunchListDialogComponent, {
    data: this.packages,
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      this.packages.push(result);
    }
    });
  }

  refersh(){

  }
}
