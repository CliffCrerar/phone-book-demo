import { Component, OnInit, ElementRef } from '@angular/core';
import { SideNavControl } from 'src/app/_models/side-nav-controls.model';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';
import { InterComponentCommsService } from '../_services/intercomp-comms.service';
import { Subject } from 'rxjs';
import { AppDataService } from '../_services/display-data.service';

@Component({
  selector: 'app-side-nav-controls',
  templateUrl: './side-nav-controls.component.html',
  styleUrls: ['./side-nav-controls.component.scss']
})
export class SideNavControlsComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  sideNavControls: SideNavControl[] = [];
  sendMessage;
  collapsedState = false;
  browserRefresh = false;
  doc = document;

  /* CLASS CONSTRUCTOR*/
  constructor(
    private displayService: AppDataService,
    private _router: Router,
    private sideNavService: NbSidebarService,
    private msgService: InterComponentCommsService

  ) {
    const { collapse, search, addContact, deleteContact, logout } = this.displayService.getGeneralData();
    this.addControl(collapse, 'arrowhead-left-outline', ['side-nav-collapsed']);
    this.addControl(search, 'search-outline', ['search-contact']);
    this.addControl(addContact, 'plus-circle-outline', ['add-contact']);
    this.addControl(deleteContact, 'person-delete-outline', ['delete-contact']);
    this.addControl(logout, 'log-out-outline', ['/login']);
    this.sendMessage = this.msgService.broadCastMessage;
  }

  /* INIT HOOK */
  ngOnInit() {
    // Subscribe to router events
    this._router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd) {
        this.onMenuSelect(routeEvent.url);
      }
    });
  }

  /* CLASS METHODS */

  invertSideNavControlArrow(collapsedState: boolean) {
    if (collapsedState) {
      this.sideNavControls[0].icon = 'arrowhead-right-outline';
    } else {
      this.sideNavControls[0].icon = 'arrowhead-left-outline';
    }
  }

  /**
   * @description Adds controls to the side nav controls attribute
   */
  addControl(par1: string, par2: string, par3: string[]): void {
    this.sideNavControls.push(new SideNavControl(par1, par2, par3));
  }

  /**
   * @description detects a menu item click
   */
  onMenuSelect(routerUrl: string): void {
    // console.log('routerUrl: ', routerUrl);
    switch (routerUrl) { // switch router URL
      case '/app/side-nav-collapsed': return handleSideNavExpandCollapse.call(this);
      case '/app/search-contact': return handleSearchActivation.call(this);
      case '/app/add-contact': return handelAddContactFormDisplay.call(this);
      case '/app/delete-contact': return handelDeleteModeActivation.call(this);
    }

    /* Handle Search bar Activate / deactivate switch */
    function handleSearchActivation() {
      this.msgService.broadCastMessage('search'); // broadcast message
      this.doc.querySelector('[title="Search"]').classList.add('toggle-on-color');
      console.log(this.sideNavControls);
    }
    /* Handle Navigation bar collapse switch */
    function handleSideNavExpandCollapse() {
      this.sideNavService.toggle(true, 'left');
      this.sideNavCollapsed = !this.sideNavCollapsed;
      this.invertSideNavControlArrow(this.sideNavCollapsed);
    }
    /* Handles the add contact action */
    function handelAddContactFormDisplay() {
      this.msgService.broadCastMessage('add-contact');
    }
    /* Handles delete contacts mode activation */
    function handelDeleteModeActivation() {
      console.log('DELETE MODE HANDLER');
      this.msgService.broadCastMessage('delete-contact');
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
