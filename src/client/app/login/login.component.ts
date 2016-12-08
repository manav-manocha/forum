import { Component, ViewEncapsulation } from '@angular/core';
import { Auth } from './../global/services/auth.service';
import { Router } from '@angular/router';
import { AppState } from './../app.service';
import { User } from './user.model';
declare let jQuery: any;

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {
  errorMessage : String = '';
  user = new User();
  
  constructor(private router : Router , private auth : Auth, public appState : AppState) {

  }
  login(){
    this.disableSubmit();
      this.auth.loginAuth(this.user.username,this.user.password,this.user.staySignIn,this.user.organisation).subscribe(response => {
        if (response['success'] === true) {
                this.router.navigate(['/app', 'dashboard']);
        } else {
              this.errorMessage = response["message"]; 
              this.enableSubmit();           
        }},err =>{
              this.errorMessage = err["message"]; 
              this.enableSubmit();   
        }
      )
  }
  enableSubmit() : void {
      jQuery(".login-button").removeClass('disabled');
      jQuery(".login-button").html('Login')
  }

  disableSubmit() : void {
    jQuery(".login-button").addClass('disabled');
    jQuery(".login-button").html('Logging in <i class="fa fa-circle-o-notch fa-spin"></i>');

  }
}
