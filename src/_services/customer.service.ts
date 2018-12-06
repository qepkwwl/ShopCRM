import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {map} from "rxjs/operators";

@Injectable()
export class CustomerService{
  constructor(private http:HttpClient,private appService:AppService){}

  public findAll(startTime:string,endTime:string,salerName:string,searchValue:string,order:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/consumer/customer/data?size=10&sortby='+order+'fdPinyinShortName&salerName='+salerName+'&searchValue='+searchValue+'&startTime='+startTime+'&endTime='+endTime+'&start='+indexPage);
  }
  public save(form:Customer):Observable<boolean>{
    form.id=0
    return this.http.post<any>(this.appService.baseUrl+'/bz/consumer/customer/api/save',form.toFormData()).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
  public update(form:Customer):Observable<boolean>{
    return this.http.post<any>(this.appService.baseUrl+'/bz/consumer/customer/api/update',form.toFormData()).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
}
