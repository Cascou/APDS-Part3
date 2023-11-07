import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import {Subject} from 'rxjs'
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  //creating global array and objects, for the issue view
  private issuedisplay:{_id:string, id:string, subject:string, description:string, department:string, province:string, date:string, __v:string}[] =[];
  private updatedissuedisplay = new Subject<{_id:string, id:string, subject:string, description:string, department:string, province:string, date:string, __v:string}[]>();

  //constructor
  constructor(private http: HttpClient, private authservice: AuthServiceService) { }

  //Async method that calls the add post POST api
  async addpost_service(pid: string, psubject: string, pdescription: string, pdepartment: string, pprovince: string, pdate: string) {
    try {
      //checks if user is logged in
      if (this.authservice.isLoggedIn()) {
        //assigns result to response
        const response = await this.http.post<{ message: string, issue: any }>('https://localhost:3000/api/issue', {
          id: pid,
          subject: psubject,
          description: pdescription,
          department: pdepartment,
          province: pprovince,
          date: pdate
        }).toPromise();
  
        //custom success or error, for custom feedback
        if (response && response.message) {
          this.issuedisplay.push(response.issue);
          this.updatedissuedisplay.next([...this.issuedisplay]);
          return { success: true, message: response.message };
        } else {
          return { success: false };
        }
      } else {
        return { success: false, error: 'Not Logged In' };
      }
    } catch (error: any) {
      return { success: false, error: error.error.error};//catches any error
    }
  }

  //Method that call the GET all issue API.
  getpost_service() {
    //checks if the user is logged in
    if (this.authservice.isLoggedIn()) {
      this.http.get<{ message: string, issue: any }>('https://localhost:3000/api/issue')
      .subscribe(
        (theissue) => {
          //assigns the result to the display
          this.issuedisplay = theissue.issue;
          this.updatedissuedisplay.next([...this.issuedisplay]);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      return { success: false, error: 'Not Logged In' };//gives error, if user is not signed in
    }
    return
  }

  //Method that call the DELETE issue API
  deletepost_service(issueid:string){
    //checks if the user is logged in
    if(this.authservice.isLoggedIn()){
      this.http.delete('https://localhost:3000/api/issue/' + issueid)
      .subscribe(()=>{
        //updates the new results to the display
        const updatedpostdeleted = this.issuedisplay.filter(issue=>issue.id!==issueid);
        this.issuedisplay = updatedpostdeleted;
        this.updatedissuedisplay.next([...this.issuedisplay]);
      },
        (error) => {
          console.error('Delete Post Error:', error);
        })
    }else{
      return { success: false, error: 'Not Logged In' };//gives error, if user is not signed in
    }
    return
  }

  //Method that updates the view if there are any changes
  getUpdateListener(){
    return this.updatedissuedisplay.asObservable();
  }
}
