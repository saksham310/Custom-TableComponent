import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private API_URL="https://jsonplaceholder.typicode.com/photos";

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(`${this.API_URL}`)
  }
}
