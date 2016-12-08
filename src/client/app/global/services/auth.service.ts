import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Auth {
  constructor(private http : Http){

  }
  loginAuth(un, pwd, rem, orgid) {
          return this.http.post('login', {
            username: un,
            password: pwd,
            staySignedIn: rem,
            orgid: orgid
          }).map((res:Response) => res.json())
		      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
  logout() {
         return this.http.get('logout').map((res:Response) => res.json())
		      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }
}
