import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Contract} from "../_models/contract";
import {Observable} from "rxjs";

@Injectable()
export class ContractService{
  constructor(private http:HttpClient){}

  public findContractByCustomer():Observable<Object>{
    return this.http.get('http://192.168.122.9:8080/bz/consumer/customergrade/data?size=10&sortby=+id&start=0');
  }
  public findContract():Observable<Object>{
      return this.http.get('http://192.168.122.9:8080/bz/consumer/customergrade/data?size=10&sortby=+id&start=0');
  }
}
