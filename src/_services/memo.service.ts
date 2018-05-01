import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Memo} from "../_models/Memo";
import {MemoItem} from "../_models/MemoItem";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AppService} from "./app.service";

@Injectable()
export class MemoService{
  constructor(private http:HttpClient,private appService:AppService){}

  public save(form:Memo):Observable<boolean>{
    let formData=new FormData();
    formData.append("fdName",form.fdAchieve);
    formData.append("fdType",form.fdType);
    formData.append("fdStartDate",form.fdStartDate);
    formData.append("fdEndDate",form.fdEndDate);
    formData.append("fdAchieve",form.fdAchieve);
    form.fdPlanMemo.forEach((p,i)=> {
      formData.append(`fdPlanMemo[${i}].fdContent`, p.fdContent);
    });
    form.fdSummaryMemo.forEach((p,i)=> {
      formData.append(`fdSummaryMemo[${i}].fdContent`, p.fdContent);
    });

    return this.http.post<any>(this.appService.baseUrl+'/bz/person/memory/api/save',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }

  public findAll(searchValue:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/person/memory/data?size=10&sortby=+id&searchValue='+searchValue+'&start='+indexPage)
  }
}
