import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sandbox',
  // templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  template: `
    <h1>Hello Sandbox!</h1>
    <form (submit)="onSubmit()">
      <div class="form-group">
        <input type="text" class="form-control" [(ngModel)]="user.name" name="name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" [(ngModel)]="user.email" name="email">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" [(ngModel)]="user.phone" name="phone">
      </div>
      <input type="submit" class="btn btn-primary" value="Add">
    </form>
    <hr>
    <div *ngFor="let user of users" class="container">
      <div class="well">
        <ul class="list-group">
          <li class="list-group-item">{{ user.name }}</li>
          <li class="list-group-item">{{ user.email }}</li>
          <li class="list-group-item">{{ user.phone }}</li>
        </ul>
      </div>
    </div>
  `
})

export class SandboxComponent implements OnInit {
  users: User[];
  user: User[];

  constructor(public dataService: DataService) {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.user = {
      name: '',
      email: '',
      phone: ''
    };
  }

  ngOnInit() {}

  onSubmit() {
    this.dataService.addUser(this.user).subscribe(user => {
      console.log(user);
      if (!this.userExists(user['id'])) {
        this.users.unshift(user);
      } else {
        console.log('user exists');
      };
    });
  }

  userExists(id: number): boolean {
    let exists = false;
    for (let user of this.users) {
      if (user['id'] == id) {
        exists = true;
      }
    }
    return exists;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
