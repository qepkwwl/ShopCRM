import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService{
  constructor(private http:HttpClient){}

  isLogined():boolean{
    var currentUser=localStorage.getItem("currentUser");
    return currentUser!=null;
  }
}
