import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerLevel} from "../_models/customer-level";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerLevelService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerLevel>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/consumer/customerlevel/data?size=100&sortby=+id&start=0').pipe(
      map((response)=>response.content.map(item=>{
          return new CustomerLevel(item);
        })),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
