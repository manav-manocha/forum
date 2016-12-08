import { Component, OnInit } from '@angular/core';
import { AppState } from './../app.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})
export class Dashboard implements OnInit {
  embedMode : boolean = false;
  constructor(public appState : AppState){

  }
  ngOnInit() {
     this.embedMode = this.appState.isPropertyExist('embedMode');
  }
}
