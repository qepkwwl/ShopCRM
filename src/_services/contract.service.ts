import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Contract} from "../_models/contract";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {map} from "rxjs/operators";

@Injectable()
export class ContractService{
  constructor(private http:HttpClient,private appService:AppService){}

  public findAll(customerId:number,searchValue:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/sale/contract/data?size=10&sortby=+id&customerId='+(customerId||'')+'&searchValue='+searchValue+'&start='+indexPage)
  }
  public save(form:Contract):Observable<boolean>{
    let formData=new FormData();
    formData.append('fdStartTime',form.fdStartTime);
    formData.append('fdTotal',form.fdTotal);
    formData.append('fdCustomerId',form.fdCustomerId);
    formData.append('fdName',form.fdCustomerName);
    form.fdProducts.forEach((p,i)=>{
      formData.append(`fdProducts[${i}].fdName`,p.fdName);
      formData.append(`fdProducts[${i}].fdNum`,p.fdNum+"");
      formData.append(`fdProducts[${i}].fdProductId`,p.id+"");
      formData.append(`fdProducts[${i}].fdRetailPrice`,p.fdRetailPrice+"");
      formData.append(`fdProducts[${i}].fdDiscount`,p.fdDiscount+"");
      formData.append(`fdProducts[${i}].fdGardePrice`,p.fdGardePrice+"");
      formData.append(`fdProducts[${i}].fdTotal`,p.fdTotal+"");
      formData.append(`fdProducts[${i}].fdSaleType`,p.fdSaleType);
    });
    return this.http.post<any>(this.appService.baseUrl+'/bz/sale/contract/api/save',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
  public update(form:Contract):Observable<boolean>{
    let formData=new FormData();
    formData.append('id',form.id);
    formData.append('fdStartTime',form.fdStartTime);
    formData.append('fdTotal',form.fdTotal);
    formData.append('fdCustomerId',form.fdCustomerId);
    formData.append('fdName',form.fdCustomerName);
    form.fdProducts.forEach((p,i)=>{
      if(p.id!=0){
        formData.append(`fdProducts[${i}].id`,p.id+"");
      }
      formData.append(`fdProducts[${i}].fdName`,p.fdName);
      formData.append(`fdProducts[${i}].fdNum`,p.fdNum+"");
      formData.append(`fdProducts[${i}].fdProductId`,p.id+"");
      formData.append(`fdProducts[${i}].fdRetailPrice`,p.fdRetailPrice+"");
      formData.append(`fdProducts[${i}].fdDiscount`,p.fdDiscount+"");
      formData.append(`fdProducts[${i}].fdGardePrice`,p.fdGardePrice+"");
      formData.append(`fdProducts[${i}].fdTotal`,p.fdTotal+"");
      formData.append(`fdProducts[${i}].fdSaleType`,p.fdSaleType);
    });
    return this.http.post<any>(this.appService.baseUrl+'/bz/sale/contract/api/update',form.toFormData()).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
}
