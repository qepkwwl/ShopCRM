import "rxjs/add/operator/do";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
  HttpHandler
} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {App} from "ionic-angular";
import {LoginPage} from "../pages/login/login";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private app: App) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((httpEvent: HttpEvent<any>) => {
      if (httpEvent instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (/login/ig.test(err.url)||err.status==401||err.status==302) {
          this.app.getRootNav().setRoot(LoginPage);
        }
      }
    });
  }
}
