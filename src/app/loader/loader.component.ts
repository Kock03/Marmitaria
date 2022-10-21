import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  public loading: Subject<boolean> = this.loaderService.isLoading

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
