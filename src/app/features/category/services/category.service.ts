import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apibaseUrl}/api/categories`,model);
  }
  getAllCategories():Observable<Category[]>{
  return this.http.get<Category[]>(`${environment.apibaseUrl}/api/categories`);
  }

  getCategoryById(id: string): Observable<Category>{
  return this.http.get<Category>(`${environment.apibaseUrl}/api/categories/${id}`);
  }
  updateCategory(id:string,updateCategoryRequest:UpdateCategoryRequest):Observable<Category>
  {
    return  this.http.put<Category>(`${environment.apibaseUrl}/api/categories/${id}`,updateCategoryRequest);
  }
  DeleteCategory(id:string) : Observable<Category>
  {
    return this.http.delete<Category>(`${environment.apibaseUrl}/api/categories/${id}`);
  }
}
