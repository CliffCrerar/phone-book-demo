import { Component, OnInit, ElementRef } from '@angular/core';
import { SideNavControl } from 'src/app/_models/side-nav-controls.model';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-side-nav-controls',
  templateUrl: './side-nav-controls.component.html',
  styleUrls: ['./side-nav-controls.component.scss']
})
export class SideNavControlsComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  sideNavControls: SideNavControl[] = [];
  browserRefresh = false;
  arrowHead: string = 'arrowhead-left-outline';
  urlToggleSideNav = 'side-nav-collapsed'
  /* CLASS CONSTRUCTOR*/
  constructor(private _router: Router) { 
    this.addControl('Collapse side-nav',this.arrowHead,[this.urlToggleSideNav]);
    this.addControl('Search','search-outline',[]);
    this.addControl('New contact','plus-circle-outline',[]);
    this.addControl('Logout','log-out-outline',['/login']);
    // arrowhead-left-outline
  }

  

  /* INIT HOOK */
  ngOnInit() {
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
   * @param par1 title
   * @param par2 icon
   * @param par3 link
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
    console.log('routerUrl: ', routerUrl);

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