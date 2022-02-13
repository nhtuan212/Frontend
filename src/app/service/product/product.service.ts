import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    baseUrl = environment.baseUrl;

    constructor(private http:HttpClient) { }
    
    getPokemons(index: number) {
        return this.http.get<any>(`${this.baseUrl}/pokemon/${index}`);
    }
}