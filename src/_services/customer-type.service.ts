import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerType} from "../_models/customer-type";
import {catchError, tap, map} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerTypeService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerType>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/consumer/customertype/data?size=100&sortby=+id&start=0').pipe(
      map((response)=>response.content.map(item=>{
          return new CustomerType(item);
        })),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
