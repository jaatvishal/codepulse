import { Injectable } from '@angular/core';
import { addBlogPost } from '../models/add-blog-post.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UpdateBlogPost } from '../models/update-blog-post.model';

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

  getBlogPostById(id:string): Observable<BlogPost>{
    return this.http.get<BlogPost>(`${environment.apibaseUrl}/api/blogposts/${id}`);
  }

updateBlogPost(id :string ,updateblogbost:UpdateBlogPost): Observable<BlogPost>{
return this.http.put<BlogPost>(`${environment.apibaseUrl}/api/blogposts/${id}`,updateblogbost)
}

}
