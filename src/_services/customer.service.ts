import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {tap, catchError, map} from "rxjs/operators";
import {of} from "rxjs/observable/of";

@Injectable()
export class CustomerService{
  constructor(private http:HttpClient,private appService:AppService){}

  public findAll(searchValue:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/consumer/customer/data?size=10&sortby=+id&searchValue='+searchValue+'&start='+indexPage)
  }
  public save(form:Customer):Observable<boolean>{
    form.id=0;
    return this.http.post<any>(this.appService.baseUrl+'/bz/consumer/customer/api/save',form.toFormData()).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
}
