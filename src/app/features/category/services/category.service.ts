import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private cookieService:CookieService) { }

  addCategory(model:AddCategoryRequest):Observable<void>{
    return this.http.post<void>(`${environment.apibaseUrl}/api/categories?addAuth=true`,model);
  }
  getAllCategories(query?:string,sortBy?:string,sortDirection? :string,pageNumber?: number, pageSize?: number):Observable<Category[]>{
    let params= new HttpParams();

    if(query){
      params=params.set('query',query);
    }
    if(sortBy){
      params=params.set('sortBy',sortBy);
    }
    if(sortDirection){
      params=params.set('sortDirection',sortDirection);
    }
    if (pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize)
    }
  return this.http.get<Category[]>(`${environment.apibaseUrl}/api/categories`,{
    params:params
  });
  }

  getCategoryById(id: string): Observable<Category>{
  return this.http.get<Category>(`${environment.apibaseUrl}/api/categories/${id}`);
  }
  getCategoryCount(): Observable<number>{
  return this.http.get<number>(`${environment.apibaseUrl}/api/categories/count`);
  }
  updateCategory(id:string,updateCategoryRequest:UpdateCategoryRequest):Observable<Category>
  {
    return  this.http.put<Category>(`${environment.apibaseUrl}/api/categories/${id}?addAuth=true`,updateCategoryRequest);
  }
  DeleteCategory(id:string) : Observable<Category>
  {
    return this.http.delete<Category>(`${environment.apibaseUrl}/api/categories/${id}?addAuth=true`);
  }
}
