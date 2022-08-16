import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Lunch } from '../lunch.model';
import { LunchListDialogComponent } from './lunch-list-dialog/lunch-list-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-lunch-list',
  templateUrl: './lunch-list.component.html',
  styleUrls: ['./lunch-list.component.css'],
})
export class LunchListComponent implements OnInit {
  packages: Lunch[] = [
    new Lunch(
      'Churrasco',
      'Lorem isum dolor, sit amet consectetur adipisicing elit. Dolorem labore quae quisquam, porro eum iste vero facere quia mollitia aut quibusdam reprehenderit earum quas accusantium laborum. Quia quisquam corrupti recusandae!',
      'https://blog.santamassa.com.br/wp-content/uploads/2019/04/284199-churrasco-americano-e-brasileiro-voce-sabe-as-diferencas.jpg'
    ),
    new Lunch(
      'Sushi',
      'orem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem labore quae quisquam, porro eum iste vero facere quia mollitia aut quibusdam reprehenderit earum quas accusantium laborum. Quia quisquam corrupti recusandae!',
      'https://cdn.folhape.com.br/img/pc/1100/1/dn_arquivo/2021/11/sushi.jpg'
    ),
    new Lunch(
      'Pastel de Carne',
      'Lorem ipsum dolor, it amet consectetur adipisicing elit. Dolorem labore quae quisquam, porro eum iste vero facere quia mollitia aut quibusdam reprehenderit earum quas accusantium laborum. Quia quisquam corrupti recusandae!',
      'https://receitatodahora.com.br/wp-content/uploads/2022/03/pastel-de-carne1.jpg'
    ),
  ];

  @Output() packageWasSelected = new EventEmitter<Lunch>();

  method!: string;
  index!: any;
  filter!: string;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onPackageSelected(packageSelected: Lunch) {
    this.index = this.packages.findIndex(
      (lunch) => packageSelected.description === lunch.description
    );
    sessionStorage.setItem('index', this.index.toString());
    this.packageWasSelected.emit(packageSelected);
  }

  onDelete(event: any) {
    this.index = sessionStorage.getItem('index');
    this.packages.splice(this.index, 1);
  }

  openDialog() {
    const dialogRef = this.dialog.open(LunchListDialogComponent, {
      data: this.packages,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let i = this.packages.findIndex((lunch) =>
            result.description === lunch.description &&
            result.name === lunch.name);
        if (i === -1) {
          this.packages.push(result); 
        }else{
          this._snackBar.open("Produto já cadastrado!", "Fechar");
        }
      }
    });
  }
}
