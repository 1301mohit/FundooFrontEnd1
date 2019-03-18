import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'util';


const header = {

  headers: new HttpHeaders({
    'Content-Type': 'application/json',
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
    console.log("url:" + this.baseUrl + url);
    return this.http.put(this.baseUrl + url, data);
    // { responseType: 'text' });
  }

  postRequestForNote(url, data): any {
    console.log("my data", data);
    return this.http.post(this.baseUrl + url, data, header);
    // { responseType: 'text' });
  }

  getRequestForNote(url): any {
    console.log('token is  ', localStorage.getItem('token'))
    const httOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.get(this.baseUrl + url, httOption);
  }

  deleteRequestForNote(url): any {
    console.log('token is ', localStorage.getItem('token'))
    const httOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.delete(this.baseUrl + url, httOption);
  }

  putRequestForNote(url): any {
    console.log('token is  ', localStorage.getItem('token'))
    console.log("url:"+this.baseUrl + url);
    const httOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.put(this.baseUrl + url, "" ,httOption);
  }

  updateRequestForNote(url, data): any {
    console.log("updateNote url:",url)
    console.log("updateNote data",data)
    const httOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.put(this.baseUrl + url, data, httOption);
  }
}
