import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Product} from "../_models/product";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";

@Injectable()
export class ProductService{
  constructor(private http:HttpClient,private appService:AppService){}
  public findAll(searchValue:string,indexPage:number):Observable<any>{
    return this.http.get(this.appService.baseUrl+'/bz/product/main/data?size=10&sortby=+id&IsOnSale=True&searchValue='+searchValue+'&start='+indexPage)
  }
}
