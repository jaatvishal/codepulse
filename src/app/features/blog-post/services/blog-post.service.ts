import { Injectable } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http:HttpClient) { }

  createBlogPost(data: addBlogPost): Observable<BlogPost>{
return this.http.post<BlogPost>(`${environment.apibaseUrl}/api/blogposts`,data);
  }

  getAllBlogPosts(): Observable<BlogPost[]>{
  return this.http.get<BlogPost[]>(`${environment.apibaseUrl}/api/blogposts`);
  }
}
