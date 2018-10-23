import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Contract} from "../_models/contract";
import {Observable} from "rxjs";
import {AppService} from "./app.service";
import {map} from "rxjs/operators";
import {ContractProduct} from "../_models/contractProduct";

@Injectable()
export class ContractService{
  constructor(private http:HttpClient,private appService:AppService){}

  public findAll(customerId:number,startTime:string,endTime:string,salerName:string,searchValue:string,order:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/sale/contract/data?size=10&sortby='+order+'fdCreateTime&customerId='+(customerId||'')+'&salerName='+salerName+'&searchValue='+searchValue+'&startTime='+startTime+'&endTime='+endTime+'&start='+indexPage)
  }

  public findPivot(startTime:string,endTime:string,indexPage:number):Observable<any>{
    return this.http.get<any>(this.appService.baseUrl+'/bz/sale/contract/data?size=10&startTime='+startTime+'&endTime='+endTime+'&start='+indexPage)
  }

  public save(form:Contract):Observable<boolean>{
    let formData=new FormData();
    formData.append('fdStartTime',form.fdStartTime);
    formData.append('fdCustomerId',form.fdCustomerId+"");
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
    formData.append('id',form.id+"");
    formData.append('fdStartTime',form.fdStartTime);
    formData.append('fdTotal',form.fdTotal+"");
    formData.append('fdCustomerId',form.fdCustomerId+"");
    formData.append('fdName',form.fdCustomerName);
    form.fdProducts.forEach((p,i)=>{
      if(p.id>99999){
        formData.append(`fdProducts[${i}].id`,p.id+"");
      }
      formData.append(`fdProducts[${i}].fdName`,p.fdName);
      formData.append(`fdProducts[${i}].fdNum`,p.fdNum+"");
      formData.append(`fdProducts[${i}].fdProductId`,p.fdProductId+"");
      formData.append(`fdProducts[${i}].fdRetailPrice`,p.fdRetailPrice+"");
      formData.append(`fdProducts[${i}].fdDiscount`,p.fdDiscount+"");
      formData.append(`fdProducts[${i}].fdGardePrice`,p.fdGardePrice+"");
      formData.append(`fdProducts[${i}].fdTotal`,p.fdTotal+"");
      formData.append(`fdProducts[${i}].fdSaleType`,p.fdSaleType);
    });
    return this.http.post<any>(this.appService.baseUrl+'/bz/sale/contract/api/update',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }
  public addOpinion(form:ContractProduct){
    let formData=new FormData();
    formData.append('id',form.id+"");
    formData.append('fdOpinion',form.fdOpinion);
    return this.http.post<any>(this.appService.baseUrl+'/bz/sale/contractproduct/addopinion',formData).pipe(
      map(response=>response.fdCode=="OK")
    );
  }

  public delete(contractId:number){
    return this.http.get(this.appService.baseUrl+'/bz/sale/contract/delete?id='+contractId,{responseType:'text'});
  }
}
