import { BaseApi } from "../core/base-api";
import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { Category } from "../models/category.model";
import { Observable } from "rxjs";

@Injectable()

export class CategoryesService extends BaseApi{
    constructor(public http:Http){
        super(http);
    }
    addCategory(category:Category): Observable<Category>{
       return this.post('categories',category)
    }
    getCategoryes(): Observable<Category[]>{
        return this.get('categories')
    }
    
    getCategoryById(id:number):Observable<Category>{
        return this.get(`categories/${id}`)
    }
    updateCategory(category:Category):Observable<Category>{
        return this.put(`categories/${category.id}`,category)
    }
}