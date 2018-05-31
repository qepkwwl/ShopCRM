import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class AuthService{
  constructor(){}

  isLogined():boolean{
    var currentUser=localStorage.getItem("token");
    return currentUser!=null;
  }

  public getToken(): string {

    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return true;
  }
}
