import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Memo} from "../_models/Memo";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AppService} from "./app.service";

@Injectable()
export class MemoService{
  constructor(private http:HttpClient,private appService:AppService){}

  public save(form:Memo):Observable<boolean>{
    let formData=new FormData();
    if(form.id>999999){
      formData.append("id",form.id+"");
    }
    formData.append("fdName",form.fdAchieve);
    formData.append("fdType",form.fdType);
    formData.append("fdStartDate",form.fdStartDate);
    formData.append("fdEndDate",form.fdEndDate);
    formData.append("fdAchieve",form.fdAchieve);
    form.fdPlanMemoes.forEach((p,i)=> {
      if(p.id>999999){
        formData.append(`fdPlanMemoes[${i}].id`, p.id+"");
      }
      formData.append(`fdPlanMemoes[${i}].fdContent`, p.fdContent);
    });
    form.fdSummaryMemoes.forEach((p,i)=> {
      if(p.id>999999){
        formData.append(`fdSummaryMemoes[${i}].id`, p.id+"");
      }
      formData.append(`fdSummaryMemoes[${i}].fdContent`, p.fdContent);
    });


    if(form.id>999999){
      return this.http.post<any>(this.appService.baseUrl+'/bz/person/memory/api/update',formData).pipe(
        map(response=>response.fdCode=="OK")
      );
    }else{
      return this.http.post<any>(this.appService.baseUrl+'/bz/person/memory/api/save',formData).pipe(
        map(response=>response.fdCode=="OK")
      );
    }
  }
  public findAll(searchValue:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/person/memory/data?size=10&sortby=-fdCreateTime&searchValue='+searchValue+'&start='+indexPage)
  }
}
