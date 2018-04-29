import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'
import {HttpParams} from "@angular/common/http";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AppService{
  constructor(){
    this.httpJsonOptions.headers.append('Access-Control-Allow-Origin','*');
    this.httpFormOptions.headers.append('Access-Control-Allow-Origin','*');
  }
   baseUrl:string="http://192.168.122.9:8080";
  httpJsonOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  httpFormOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
}
