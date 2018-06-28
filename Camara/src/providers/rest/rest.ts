//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  apiUrl: any;
  constructor(private http: Http) {
    console.log('Hello RestProvider Provider');
    this.apiUrl = "http://villasbonaterra.sistemasags.com/api/";
  }
  addUser(data) {

    let headers: any = new Headers({ 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA' }),
      options: any = new RequestOptions({ headers: headers });
    /*
          this.http.post(url,data, options).map(res => res).subscribe(data => {
            return  data.json();
          });
    */
    return this.http.post(this.apiUrl + "Visitor/Add", data, options).map(res => res.json());

  }
  getSubjects() {
    return this.http.get(this.apiUrl + "Subject/All").map(res => res.json());
  }
  getStreets() {
    return this.http.get(this.apiUrl + "Street/all").map(res => res.json());
  }
  getId(id) {
    return this.http.get(this.apiUrl + "Visitor/Get/?id="+id).map(res => res.json());
  }
}
