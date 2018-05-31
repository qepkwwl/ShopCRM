import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {RedletterDay} from "../_models/redletter-day";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {map} from "rxjs/operators";

@Injectable()
export class RedletterDayService{
  constructor(private http:HttpClient,private appService:AppService){}
  public findAll(customerId:number,searchValue:string,indexPage:number):Observable<any>{
    return this.http.get(this.appService.baseUrl+'/bz/consumer/customerkeyday/data?size=10&sortby=+id&customerId='+(customerId||'')+'&searchValue='+searchValue+'&start='+indexPage)
  }
  public save(form:RedletterDay):Observable<boolean>{
    let formData=new FormData();
    formData.append("fdName",form.fdName||'');
    formData.append("fdKeyDay",form.fdKeyDay);
    formData.append("fdCustomerId",form.fdCustomerId+'');
    return this.http.post<any>(this.appService.baseUrl+'/bz/consumer/customerkeyday/api/save',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }

}
