import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  //creating global variable of error message
  errorMessage: string | null = null;

  //constructor
  constructor(public authservice: AuthServiceService, private router: Router){ }

  ngOnInit(): void { 
  }

  //Method to login in the user
  async onlogin(loginform: NgForm){
    if (loginform.invalid) {
      return;
    } else {

      //calls the method from authentication service
      const result = await this.authservice.login(loginform.value.enteredusername, loginform.value.enteredpassword);

      //customer success or error messages
      if(result && result.message){
        this.errorMessage = result.message
      }else if(result && result.error){
        this.errorMessage = result.error
      }
    }
  }

  //Method to login
  logout() {
    this.authservice.setToken(''); // Clear the authentication token
    this.router.navigate(['/login']);//navigating to the login page.
  }
}
