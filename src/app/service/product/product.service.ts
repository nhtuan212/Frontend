import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    httpOptions = {  
        headers: new HttpHeaders({  
        'Content-Type': 'application/json; charset=utf-8'  
        }),
    }; 

    constructor(private http:HttpClient) { }

    getAll():Observable<Product[]>{
        return this.http.get<Product[]>(environment.apiUrl).pipe();
    }
}
