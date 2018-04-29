import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerGrade} from "../_models/customer-grade";
import {CustomerSource} from "../_models/customer-source";
import {map, catchError} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerSourceService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerSource>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/consumer/customersource/data?size=100&sortby=+id&start=0').pipe(
      map((response)=>response.content.map(item=>{
          return new CustomerSource(item);
        })),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
