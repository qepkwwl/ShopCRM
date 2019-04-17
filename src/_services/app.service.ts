import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";
import "rxjs/add/operator/map";

@Injectable()
export class AppService{
  constructor(){
    this.httpJsonOptions.headers.append('Access-Control-Allow-Origin','*');
    this.httpFormOptions.headers.append('Access-Control-Allow-Origin','*');
  }
  baseUrl:string="http://111.230.9.200:8080";

//baseUrl:string="http://192.168.224.29:8080";
  httpJsonOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  httpFormOptions = {headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})};
}
