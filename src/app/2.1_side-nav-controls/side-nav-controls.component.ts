import { Component, OnInit } from '@angular/core';
import { SideNavControl } from './side-nav-controls.model';

@Component({
  selector: 'app-side-nav-controls',
  templateUrl: './side-nav-controls.component.html',
  styleUrls: ['./side-nav-controls.component.scss']
})
export class SideNavControlsComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  sideNavControls: SideNavControl[] = [];

  /* CLASS CONSTRUCTOR*/
  constructor() { 
    this.addControl('Profile','person-outline',[]);
    this.addControl('Change Password','lock-outline',[]);
    this.addControl('Privacy Policy','checkmark-outline',[]);
    this.addControl('Logout','log-out-outline',[]);
  }

  /* INIT HOOK */
  ngOnInit() {
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