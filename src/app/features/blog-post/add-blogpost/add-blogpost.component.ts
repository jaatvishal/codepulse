import { Component, OnInit } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
  model:addBlogPost;
  Categories$?:Observable<Category[]>;
  private  addblogpostsubscription?: Subscription;
  constructor(private blogPostservice:BlogPostService,private router: Router,private categoryService: CategoryService){
    this.model={
      title: '',
      shortdescription :'',
      urlHandle:'',
      content: '', 
      featuredImageUrl:'',    
       author: '',
     isVisible:true,
     publishedDate: new Date(),
     categories:[]
     
    }
  }
  ngOnInit(): void {
   this.Categories$= this.categoryService.getAllCategories();
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
