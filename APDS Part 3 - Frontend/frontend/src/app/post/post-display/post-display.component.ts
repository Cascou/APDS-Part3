import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs'
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit{
  //global variable to hold custom messages
  errorMessage: string | null = null;

  //creating area of type issues
  issues:{_id:string, id:string, subject:string, description:string, department:string, province:string, date:string, __v:string}[] = [];

  //constructor
  constructor(public issueservice: PostServiceService){}
  //creating subscription object
  private issuesubscription!: Subscription;

  //calls method from posts services to get all issues on initiation
  ngOnInit(){
    this.issueservice.getpost_service();//calling the get post method from post services
    this.issuesubscription = this.issueservice.getUpdateListener()
    .subscribe((issues:{_id:string, id:string, subject:string, description:string, department:string, province:string, date:string, __v:string}[])=>{
      this.issues = issues;
    });
  }

  ngOnDestroy(){
    this.issuesubscription.unsubscribe();
  }

  //Method that calls the delete method
  ondelete(issueid:string){
    this.issueservice.deletepost_service(issueid)
  }
}
