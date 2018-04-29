import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerGrade} from "../_models/customer-grade";
import {CustomerType} from "../_models/customer-type";
import {catchError, map} from "rxjs/operators";
import {CustomerPurpose} from "../_models/customer-prupose";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerPurposeService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerPurpose>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/consumer/customerpurpose/data?size=100&sortby=+id&start=0').pipe(
      map((response)=>response.content.map(item=>{
          return new CustomerPurpose(item);
        })),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
