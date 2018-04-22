import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'

@Injectable()
export class UserService{
  constructor(private http:HttpClient){}

  login(userId:string,password:string){
    localStorage.setItem("currentUser","W08709");
    return "OK";
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
