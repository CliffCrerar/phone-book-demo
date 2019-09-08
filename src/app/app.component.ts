import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  /* CLASS ATTRIBUTES */
  _loginBackground: Element;
  
  /* CLASS CONSTRUCTOR */
  constructor(private _title: Title, private _router: Router) {
    this._title.setTitle('Phone Book'); // set the title to the initial 'Phone Book'
    return;
  }

  /* INIT HOOK */
  ngOnInit() {
    // console.log(screen);
    this._loginBackground = document.querySelector("#loginBackground");
    this._router.events.subscribe(routeEvent => this.handleRouteEvent(routeEvent));
    return;
  }

  /* CLASS METHODS */

  /**
   * @name handleRouteEvent
   * @description Method receives router events from the router life cycle hooks
   * and can trigger method here in the top level of the app depending
   * on a specific router event.
   * @param routeEvent -> is the router event passed from the router events subscription
   * @returns void
   */
  handleRouteEvent(routeEvent: Event): void {
    // console.log('routeEvent: ', routeEvent);
    // check if routing event is an instance of navigation end
    routeEvent instanceof NavigationEnd && this.dynamicPageTitle(routeEvent.url.toString()) // run function to update title
    return;
  }

  /**
   * @name setTitle
   * @description This method updates the page title depending on a route
   * @param route
   * @returns void
   */
  dynamicPageTitle(route: string): void {
    switch (route) { // discriminate page route
      case '/':
        this._title.setTitle('Phone book'); break; // set title
      case '/login':
        this._title.setTitle('Phone book Login'); break; // set title
      case '/app':
        this._title.setTitle('Phone book Main App'); // set title
        this._loginBackground.remove(); // remove login background from app
        break;
    }
    return;
  }

}
