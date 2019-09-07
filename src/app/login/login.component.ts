import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  appName: string;
  supportLink: string;
  /* CLASS CONSTRUCTOR */
  constructor() {
    this.appName = "Phonebook";
    this.supportLink = "Need Support?";
  }
  /* INIT HOOK */
  ngOnInit() {
  }

  /* CLASS METHODS */

  enterSetCookie() {

  }

}
