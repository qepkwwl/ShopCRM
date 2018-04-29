import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'
import {tap, catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {HttpHeaders} from "@angular/common/http";
import {AppService} from "./app.service";

@Injectable()
export class UserService{
  constructor(private http: HttpClient,private appSerivce:AppService) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.appSerivce.baseUrl+'/api/login', JSON.stringify({fdUserName: username, fdPassword: password}), this.appSerivce.httpJsonOptions).pipe(
      tap(response => {
        let token = response.token;
        if (token) {
          localStorage.setItem('token', token);
          return true;
        } else {
          return false;
        }
      }),
      catchError((err) => {
        console.log(err);
        console.error(err);
        return of(false)
      })
    );
  }


  getToken(): String {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
}
