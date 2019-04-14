import { Component, OnInit } from '@angular/core';
declare var AdminLTE: any;

@Component({
  selector: 'app-accounts-content',
  templateUrl: './accounts-content.component.html',
  styleUrls: ['./accounts-content.component.css']
})
export class AccountsContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Update the AdminLTE layouts
    AdminLTE.init();
  }

}
