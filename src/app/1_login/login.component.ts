import { Component, OnInit } from '@angular/core';
import { AppDataService } from '../_services/display-data.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

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
  constructor(
    private uiService: AppDataService, 
    private toastService: NbToastrService,
    private _router: Router
    ) {
    this.appName = this.uiService.getGeneralData().AppName;
    this.supportLink = this.uiService.getGeneralData().SupportLink;
  }
  /* INIT HOOK */
  ngOnInit():void {
  }

  /* CLASS METHODS */

  enterSetCookie():void {
    setTimeout(() => {
      this._router.navigate(['/app']);
    }, 3000);
  }

}
