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
  // no class attributes in this components
  /* CLASS CONSTRUCTOR */
  constructor(private _title: Title, private _router: Router) {
    this._title.setTitle('Phone Book'); // set the title to the initial 'Phone Book'
    return;
  }

  /* INIT HOOK */
  ngOnInit() {
    console.log(screen);
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
    if (routeEvent instanceof NavigationEnd) {
      console.log('routeEvent: ', routeEvent);
      this.dynamicPageTitle(routeEvent.url.toString())
    }
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
      case '/':  this._title.setTitle('Phone book'); 
      case '/login':  this._title.setTitle('Phone book Login'); 
    }
    return;
  }

}
