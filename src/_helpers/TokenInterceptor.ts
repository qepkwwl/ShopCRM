import {Injectable} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "../_services/auth.service";
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });
    return next.handle(request);
  }
}
