import { Component, OnInit } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
  model:addBlogPost;
  Categories$?:Observable<Category[]>;
  isImageSelectorVisible :boolean=false;
  private  addblogpostsubscription?: Subscription;
  imageSelectorSubscription?:Subscription;
  
  constructor(private blogPostservice:BlogPostService,private router: Router,private categoryService: CategoryService,private imageService:ImageService){
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
  this.imageSelectorSubscription= this.imageService.onSelectImage().subscribe({next:(selectedImage)=>{

    this.model.featuredImageUrl=selectedImage.url;
    this.closeImageSelector();
   }})
  }

  onFormSubmit():void{
   this.addblogpostsubscription= this.blogPostservice.createBlogPost(this.model).subscribe({next:(response)=>{
      this.router.navigateByUrl('/admin/blogposts');
      console.log(response);
    console.log("This was successful!");
    }})
  }
  openImageSelector():void{
    this.isImageSelectorVisible=true;
  }
  closeImageSelector():void{
   this.isImageSelectorVisible=false;
  }
  ngOnDestroy(): void {
    this.addblogpostsubscription?.unsubscribe();
    this.imageSelectorSubscription?.unsubscribe();

  }
}
