  import { Component, OnInit, ElementRef } from '@angular/core';
import { SideNavControl } from 'src/app/_models/side-nav-controls.model';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-side-nav-controls',
  templateUrl: './side-nav-controls.component.html',
  styleUrls: ['./side-nav-controls.component.scss']
})
export class SideNavControlsComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  sideNavControls: SideNavControl[] = [];
  browserRefresh = false;
  doc = document;
  sendMessage;

  /* CLASS CONSTRUCTOR*/
  constructor(
    private _router: Router, 
    private sideNavService: NbSidebarService,
    private msgService: InterComponentCommsService
  ) { 
    this.addControl('Collapse side-nav','arrowhead-left-outline',['side-nav-collapsed']);
    this.addControl('Search','search-outline',['search-contact']);
    this.addControl('New contact','plus-circle-outline',['add-contact']);
    this.addControl('Delete contact','person-delete-outline',['add-contact']);
    this.addControl('Logout','log-out-outline',['/login']);

    this.sendMessage = this.msgService.broadCastMessage
    // arrowhead-left-outline
  }

  /* INIT HOOK */
  ngOnInit() {
    // Subscribe to router events
    this._router.events.subscribe(routeEvent=>{
      if(routeEvent instanceof NavigationEnd){
        this.onMenuSelect(routeEvent.url)
      }
    })
  }

  /* CLASS METHODS */

  /**
   * @name addControl
   * @description Adds controls to the side nav controls attribute 
   * @param ( title , icon , link )
   */
  addControl(par1: string, par2: string, par3: string[]): void {
    this.sideNavControls.push(new SideNavControl(par1,par2,par3));
  }


  /**
   * @name onMenuSelect
   * @description detects a menu item click
   * @param ev 
   */
  onMenuSelect(routerUrl: string):void{
    // console.log('routerUrl: ', routerUrl);
    switch(routerUrl){ // switch router URL
      case'/app/side-nav-collapsed': return handleSideNavExpandCollapse.call(this);
      case'/app/search-contact': return handleSearchActivation.call(this);
    }

    /* Handle Search bar Activate / deactivate switch */
    function handleSearchActivation(){
      this.msgService.broadCastMessage('search'); // broadcast message
      this.doc.querySelector('[title="Search"]').classList.add('toggle-on-color');
      console.log(this.sideNavControls);
    }
    /* Handle Navigation bar collapse switch */
    function handleSideNavExpandCollapse(){
      this.sideNavService.toggle(true, 'left');
      this.sideNavControls[0].icon==='arrowhead-left-outline' ?  this.sideNavControls[0].icon = 'arrowhead-right-outline' : this.sideNavControls[0].icon = 'arrowhead-left-outline' 
    }
  }
}


/* Side nav controls example 
  
  sideNavControls = [
    {
      title: 'Profile',
      icon: 'person-outline',
      link: [],
    },
    {
      title: 'Change Password',
      icon: 'lock-outline',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: { icon: 'checkmark-outline', pack: 'eva' },
      link: [],
    },
    {
      title: 'Logout',
      icon: 'unlock-outline',
      link: [],
    },
  ];
 
 */