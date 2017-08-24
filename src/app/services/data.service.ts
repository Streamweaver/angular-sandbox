import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {observable} from 'rxjs/symbol/observable';

@Injectable()
export class DataService {
  data: Observable<Array<number>>;

  constructor() {
  }

  getData() {
    this.data = new Observable(observer => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
    });
    return this.data;
  }

}
