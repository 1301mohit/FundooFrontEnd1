import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'util';


const header = {
  
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'token': localStorage.getItem('token')
  })
};


@Injectable({
  providedIn: 'root'
})


export class HttpService {


  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080";
  static postRequest: any;
  static putRequest: any;

  postRequest(url, data): any {
    console.log("my data", data);
    return this.http.post(this.baseUrl + url, data);

    // { responseType: 'text' });

  }

  putRequest(url, data) {
    console.log("url:"+this.baseUrl + url);
    
    return this.http.put(this.baseUrl + url, data);
    // { responseType: 'text' });
  }

  postRequestForNote(url, data): any {

    console.log("my data", data);
    return this.http.post(this.baseUrl + url, data, header);

    // { responseType: 'text' });

  }
}
