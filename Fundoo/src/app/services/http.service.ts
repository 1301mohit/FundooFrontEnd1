import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { log } from 'util';
import { environment } from '../../environments/environment';


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
 // private baseUrl = "http://localhost:8080";
  private baseUrl = environment.baseUrl;
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
    console.log("my data in httpService", data);
    console.log("Url",url);
    return this.http.post(this.baseUrl + url, data, header);
    // { responseType: 'text' });
  }

  getRequestForNote(url): any {
    console.log('token is  ', localStorage.getItem('token'))
    console.log('Url',this.baseUrl+url);
    const httOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
      })
    }
    return this.http.get(this.baseUrl+url, httOption);
    // console.log("Header",header);
    // return this.http.get(this.baseUrl + url, header);
  }

  deleteRequestForNote(url): any {
    console.log('token is ', localStorage.getItem('token'))
    // const httOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'token': localStorage.getItem('token')
    //   })
    // }
   // return this.http.delete(this.baseUrl + url, httOption);
   return this.http.delete(this.baseUrl + url, header);
  }

  putRequestForNote(url): any {
    console.log('token is  ', localStorage.getItem('token'))
    console.log("url:"+this.baseUrl + url);
    // const httOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'token': localStorage.getItem('token')
    //   })
    // }
    // return this.http.put(this.baseUrl + url, "" ,httOption);
    return this.http.put(this.baseUrl + url, "" ,header);
  }

  // putRequestForNote(url,data): any {
  //   console.log('token is  ', localStorage.getItem('token'))
  //   console.log("url:"+this.baseUrl + url);
  //   // const httOption = {
  //   //   headers: new HttpHeaders({
  //   //     'Content-Type': 'application/json',
  //   //     'token': localStorage.getItem('token')
  //   //   })
  //   // }
  //   // return this.http.put(this.baseUrl + url, "" ,httOption);
  //   return this.http.put(this.baseUrl + url, data ,header);
  // }

  updateRequestForNote(url, data): any {
    console.log("updateNote url:",url)
    console.log("updateNote data",data)
    // const httOption = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'token': localStorage.getItem('token')
    //   })
    // }
    // return this.http.put(this.baseUrl + url, data, httOption);
    return this.http.put(this.baseUrl + url, data, header);
  }

  // uploadProfilePic(url, file): any{
  //   console.log("file",file);

  // let formData: FormData = new FormData();
  // //formdata.append('File',file);
  //  // const formData = new FormData();
  //   formData.append('file', file);
  //   console.log(file);
    
  //   return this.http.post(this.baseUrl+url,formData, header);
  // }


  public   uploadProfilePic(url,file: File):any
{
  let formdata: FormData = new FormData();
  formdata.append('file',file);
  return this.http.post(this.baseUrl+url,formdata,{
    headers:new HttpHeaders().set("token",localStorage.getItem("token")), 
  observe:'response'});
}
}
