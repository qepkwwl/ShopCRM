import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Followup} from "../_models/followup";
import {Injectable} from "@angular/core";
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class FollowupService{
  constructor(private http:HttpClient,private appService:AppService){}

  public save(form:Followup):Observable<boolean>{
    let formData=new FormData();
    formData.append("fdName",form.fdCustomerName);
    formData.append("fdCustomerId",form.fdCustomerId+"");
    formData.append("fdTime",`${form.fdDate} 00:00:00`);
    formData.append("fdContent",form.fdContent);
    formData.append("fdGift",form.fdGift||'');
    return this.http.post<any>(this.appService.baseUrl+'/bz/person/followup/api/save',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }

  public update(form:Followup):Observable<boolean>{
    let formData=new FormData();
    formData.append("id",form.id+"");
    formData.append("fdName",form.fdCustomerName);
    formData.append("fdCustomerId",form.fdCustomerId+"");
    formData.append("fdTime",`${form.fdDate} 00:00:00`);
    formData.append("fdContent",form.fdContent);
    formData.append("fdGift",form.fdGift||'');
    return this.http.post<any>(this.appService.baseUrl+'/bz/person/followup/api/update',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
 //startTime endTime customerId searchValue
  public findAll(startTime:string,endTime:string,customerId:number,searchValue:string,order:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/person/followup/data?size=10&sortby='+order+'fdTime&customerId='+(customerId||'')+'&searchValue='+searchValue+'&startTime='+startTime+'&endTime='+endTime+'&start='+indexPage)
  }
}
