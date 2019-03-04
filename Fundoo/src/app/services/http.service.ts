import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080";
  static postRequest: any;
  static putRequest: any;
  
  postRequest(url, data) : any {
  console.log("my data",data);
  return this.http.post(this.baseUrl + url,data,{ responseType: 'text' });
  }

  putRequest(url, data){
  return this.http.put(this.baseUrl + url,data,{ responseType: 'text' });
  }
}
