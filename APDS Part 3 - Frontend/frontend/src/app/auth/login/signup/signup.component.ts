import { Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  //global variable for custom errors
  errorMessage: string | null = null;

  //constructor
  constructor(public authservice: AuthServiceService, private router: Router){ }

  ngOnInit(): void {    
  }

  //method to sign up user
  async onsignup(signupform: NgForm){
    
    if(signupform.invalid){
      return;
    }else {

      //calls method from authentication service
      const result = await this.authservice.signup(signupform.value.enteredname, signupform.value.enteredsurname, signupform.value.enteredusername, signupform.value.enteredpassword)
  
      //custom success or error validation
      if(result && result.message){
        this.errorMessage = result.message
      }else if(result && result.error){
        this.errorMessage = result.error
      }
    }
  }
}
