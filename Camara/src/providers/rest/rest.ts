//import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
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
    //this.apiUrl = "http://localhost:56122/api/";
  }
  addUser(data) {

    let headers: any = new Headers({ 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA' }),
      options: any = new RequestOptions({ headers: headers });
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
  CkeckRegister(Street, NumberHouse){
    return this.http.get(this.apiUrl + "Access/CheckDom/?Street="+ Street+"&NumberHouse="+NumberHouse).map(res => res.json());
  }
  addRegister(data){
    let headers: any = new Headers({ 'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA' }),
      options: any = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + "Access/Add", data, options).map(res => res.json());
  }
  getCards(){
    return this.http.get(this.apiUrl + "Access/Get").map(res => res.json());
  }
  Exit(id){
    return this.http.get(this.apiUrl + "Access/Update/?id="+id).map(res => res.json());
  }
}
