import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent{
  //global variable for custom error messages
  errorMessage: string | null = null;

  //constructor
  constructor(public postservice: PostServiceService){ }
  
  //Async method that call from post services
  async onaddPost(postform: NgForm){

    if(postform.invalid){
      return
    }

    //calls method that triggers post api
    const result = await this.postservice.addpost_service(postform.value.enteredID, postform.value.enteredSubject, postform.value.enteredDescription, postform.value.enteredDepartment, postform.value.enteredProvince, postform.value.enteredDate)

    //gets result of call to assign custom success or error
    if(result && result.message){
      this.errorMessage = result.message
    }else if(result && result.error){
      this.errorMessage = result.error
    }
  }
}
