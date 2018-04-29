import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerGrade} from "../_models/customer-grade";
import {tap, catchError, map} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerGradeService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerGrade>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/consumer/customergrade/data?size=100&sortby=+id&start=0').pipe(
      map(response=>{
        return response.content.map(item=>{
          return new CustomerGrade(item);
        });
      }),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
