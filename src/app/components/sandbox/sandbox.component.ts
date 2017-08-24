import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sandbox',
  // templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  template: `
    <h1>Hello Sandbox!</h1>
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
  users: any[];
  constructor(public dataService: DataService) {
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  ngOnInit() {
  }

}
