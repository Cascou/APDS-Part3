import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //global variable to hold token
  private token:string | null = null;

  //constructor
  constructor(private http:HttpClient) { }

  //Method used to sign up user that calls API end point
  async signup (uname:string, usurname:string, uusername:string, upassword:string){
    try{
      //assign result to response
      const response = await this.http.post<{message: string}>('https://localhost:3000/api/user/signup', {name: uname, surname:usurname, username:uusername, password:upassword}).toPromise();

      //custom success or error validation
      if(response && response.message){
        return {success:true, message: response.message}
      }else{
        return {success: false}
      }

    }catch(error: any){
      return { success: false, error: error.error.error };//capture all errors
    }
  }

  //Method used to login user that calls API end point
  async login(uusername: string, upassword: string) {
    try {
      //assing result to response
      const response = await this.http.post<{ token: string, status: string }>('https://localhost:3000/api/user/login', {
        username: uusername,
        password: upassword
      }).toPromise();
      
      //custom success or error validation
      if (response && response.token) {
        this.setToken(response.token);//calls setToken, to set token to localstorage
        return { success: true, message: response.status };
      } else {
        return { success: false };
      }
    } catch (error: any) {
      return { success: false, error: error.error.error }; //capture all errors
    }
  }
  
  //Method used to set token to local storage
  setToken(token: string){
    localStorage.setItem('authtoken', token)
  }

  //Method used to get token from local storage
  getToken(){
    return localStorage.getItem('authtoken')
  }

  //Method to get bool value, of whether user is logged in or not
  isLoggedIn(): boolean{
    return !!this.getToken()
  }
}
