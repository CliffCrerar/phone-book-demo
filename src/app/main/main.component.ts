import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  sideBarToggleObservable: Observable<{compact: boolean, tag: string}>
  sideBarToggleBtn: 'arrow-circle-left-outline';
  collapseBtnClass: "collapse-btn-style"
  /* CLASS CONSTRUCTOR */
  constructor(private sideBarService: NbSidebarService) { 
    return;
  }
  /* INIT HOOK */
  ngOnInit():void {
    this.sideBarToggleObservable = this.sideBarService.onToggle();
    return;
  }

  toggleSideBar(){
    this.sideBarService.toggle(true, 'left');
    return;
  }

}
