import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  userServiceUrl = 'http://jsonplaceholder.typicode.com/users';
  constructor(public http: Http) { }

  getUsers() {
    return this.http.get(this.userServiceUrl)
      .map(res => res.json());
  }

  addUser(user) {
    return this.http.post(this.userServiceUrl, user).
      map(res => res.json());
  }

  deleteUser(userid: number) {
    return this.http.delete(this.userServiceUrl + '/' + userid)
      .map(res => res.json());
  }
}
