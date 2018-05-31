import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {CustomerGrade} from "../_models/customer-grade";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {ContractProductType} from "../_models/contractProduct-type";

@Injectable()
export class ContractProductTypeService{
  constructor(private http:HttpClient,private appSerivce:AppService){}

  public findAll():Observable<Array<CustomerGrade>>{
    return this.http.get<any>(this.appSerivce.baseUrl+'/bz/sale/contractproducttype/data?size=100&sortby=+id&start=0').pipe(
      map(response=>{
        return response.content.map(item=>{
          return new ContractProductType(item);
        });
      }),
      catchError((err)=>{
          return of([]);
      })
    );
  }
}
