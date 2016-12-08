/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, ErrorHandler, OnInit } from '@angular/core';

import { AppState } from './app.service';
import { Router, NavigationStart , ActivatedRoute } from '@angular/router';
import { CookieService } from './global/services/cookie.service';
import 'rxjs/add/operator/filter';

declare var jQuery: any;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App implements OnInit{
    
  constructor(private appState: AppState, private router: Router, private cookieService : CookieService ) {    
    if(this.isEmbedQueryParamPresent()){
      this.appState.set('embedMode',true);
    }
  }
  
  ngOnInit() {
    // Stop loader
    jQuery('body').addClass('loaded');

    /**
    * Authentication Checks
    * If auth cookie is not present, redirect to login page for any angular routes
    * If auth cookie is present and user opens login page, redirect to dashboard
    **/    
    this.router.events.filter(val => val instanceof NavigationStart).subscribe((val) => {
        let cookie = this.cookieService.getAuthCookieJSON();
            if(val.url === '/login' || val.url === '/' ) {
                if (cookie !== undefined) {
                  this.router.navigate(['/app','dashboard'])
                } 
            } else {
                if (cookie === undefined && val.url != '/error') {                  
                  this.router.navigate(['/login'])
                } 
            }   
    });
  }
  
  //Function to check if url contains embed query param
  isEmbedQueryParamPresent() : boolean  {
    let query = window.location.search.substring(1);
    let vars = query.split('&');
    for (let i = 0 ; i < vars.length ; i++) {
      let queryParam = vars[i].split('=');
      if(queryParam[0] === 'embed'|| queryParam[0] === 'embed/') { //If query param is "embed" return true
        return true;
      }
    }     
    return false; //If query param embed is not present in url return false
  }
}




