import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { AppDataService } from '../_services/display-data.service';
import { HttpService } from '../_services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  appName: string;
  settingsBtnTitle: string;
  sideBarToggleObservable: Observable<{compact: boolean, tag: string}>
  sideBarToggleBtn: 'arrow-circle-left-outline';
  collapseBtnClass: "collapse-btn-style"
  /* CLASS CONSTRUCTOR */
  constructor(
    private sideBarService: NbSidebarService, 
    private uiService: AppDataService,
    private httpService: HttpService
    ) { 
    this.appName= uiService.getGeneralData().AppName;
    this.settingsBtnTitle= uiService.getGeneralData().settingsBtnTitle;
    return;
  }
  /* INIT HOOK */
  ngOnInit():void {
    this.sideBarToggleObservable = this.sideBarService.onToggle();
    return;
  }

  /**
   * @name toggleSideBar
   * @description switches the sidebar between expanded and compact
   */
  toggleSideBar(){
    this.sideBarService.toggle(true, 'left');
    return;
  }



}
