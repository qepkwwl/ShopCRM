import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {tap, catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {AppService} from "./app.service";
import {BasePage} from "../pages/base/BasePage";

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
          localStorage.setItem('role', response.sysOrgPerson.fdRoleCode);
          localStorage.setItem('area', response.sysOrgPerson.fdAreaName);
          localStorage.setItem('userid', response.sysOrgPerson.id);
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

  findAchieve(): Observable<any> {
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/achieve/main/my');
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('userid'));
  }

  getArea(): string {
    return localStorage.getItem('area');
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
  }
  resetPassword(fdPassword :string,fdNewPassword:string):Observable<any>{
    let formData=new FormData();
    formData.append("fdPassword",fdPassword);
    formData.append("fdNewPassword",fdNewPassword);
    return this.http.post<any>(this.appSerivce.baseUrl+'/sys/org/person/api/reset', formData);
  }
  getVersion(): Observable<any> {
    return this.http.get<any>(this.appSerivce.baseUrl+'/sys/admin/system/version?p='+BasePage.DevicePlatform);
  }
}
