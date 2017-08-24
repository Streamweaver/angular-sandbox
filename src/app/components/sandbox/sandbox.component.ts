import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-sandbox',
  //templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  template: `
    <h1>Hello Sandbox!</h1>
  `
})
export class SandboxComponent implements OnInit {

  constructor(public dataSvc: DataService) {
  }

  ngOnInit() {
  }

}
