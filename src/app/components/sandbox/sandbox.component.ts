import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sandbox',
  // templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  template: `
    <h1>Hello Sandbox!</h1>
    <form (submit)="onSubmit(isEdit)">
      <div class="form-group">
        <input type="text" class="form-control" [(ngModel)]="user.name" name="name">
      </div>
      <div class="form-group">
        <input type="email" class="form-control" [(ngModel)]="user.email" name="email">
      </div>
      <div class="form-group">
        <input type="text" class="form-control" [(ngModel)]="user.phone" name="phone">
      </div>
      <input type="submit" class="btn btn-primary" value="{{ isEdit ? 'Update' : 'Add' }}">
      <button (click)="clearUser()" class="btn btn-toolbar">Clear</button>
    </form>
    <hr>
    <div *ngFor="let user of users" class="container">
      <div class="well">
        <ul class="list-group">
          <li class="list-group-item">{{ user.name }}</li>
          <li class="list-group-item">{{ user.email }}</li>
          <li class="list-group-item">{{ user.phone }}</li>
        </ul>
        <button (click)="editClick(user)" class="btn btn-primary btn-sm">Edit</button>
        <button (click)="deleteClick(user.id)" class="btn btn-danger btn-sm">Delete</button>
      </div>
    </div>
  `
})

export class SandboxComponent implements OnInit {
  users: User[];
  user: User;
  isEdit: boolean;

  constructor(public dataService: DataService) {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.user = {
      id:     0,
      name:  '',
      email: '',
      phone: ''
    };
  }

  ngOnInit() {}

  onSubmit(isEdit: boolean) {
    if (isEdit) {
      this.addUser();
    } else {
      this.updateUser();
    }
  }

  private addUser() {
    this.dataService.addUser(this.user).subscribe(user => {
      console.log(user);
      if (!this.userExists(user['id'])) {
        this.users.unshift(user);
      } else {
        console.log('user exists');
      }
    });
  }

  private updateUser() {
    this.dataService.updateUser(this.user).subscribe( user => {
      this.users = this.users.filter(u => u.id !== user.id);
      this.users.unshift(user);
    });
  }

  userExists(id: number): boolean {
    return this.getUserByID(id) ? true : false;
  }

  getUserByID(id: number): User {
    for (const user of this.users) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }

  deleteClick(id: number) {
    this.dataService.deleteUser(id).subscribe( res => {
      console.log(res);
    });
    this.users = this.users.filter(u => u.id !== id);
  }

  editClick(user: User) {
    this.isEdit = true;
    this.user = user;
  }

  clearUser() {
    this.user = {
      id:     0,
      name:  '',
      email: '',
      phone: ''
    };
    this.isEdit = false;
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
