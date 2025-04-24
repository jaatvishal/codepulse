import { Component } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model:addBlogPost;
  private  addblogpostsubscription?: Subscription;
  constructor(private blogPostservice:BlogPostService,private router: Router){
    this.model={
      title: '',
      shortdescription :'',
      urlHandle:'',
      content: '', 
      featuredImageUrl:'',    
       author: '',
     isVisible:true,
     publishedDate: new Date()
     
    }
  }

  onFormSubmit():void{
   this.addblogpostsubscription= this.blogPostservice.createBlogPost(this.model).subscribe({next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
      console.log(response);
    console.log("This was successful!");
    }})
  }
  ngOnDestroy(): void {
    this.addblogpostsubscription?.unsubscribe();
  }
}
