// import { Injectable } from '@angular/core';
// import {BehaviorSubject} from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LunchRequestService {
//   private lunchName = new BehaviorSubject<any>({})
//   selectedLunchName = this.lunchName.asObservable();
//   private lunchNameListBus = new BehaviorSubject<any>([])
//   lunchNameList = this.lunchNameListBus.asObservable();

//   constructor() { }
//   setLunch(lunch: any){
//     this.lunchName.next(lunch);
//   }

//   setLunchList(lunchName: any) {
//     this.lunchNameListBus.next(lunchName);
//   }
// }
