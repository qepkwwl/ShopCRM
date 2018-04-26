import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Followup} from "../_models/followup";
import {Injectable} from "@angular/core";
import {RedletterDay} from "../_models/redletter-day";
import {Customer} from "../_models/customer";

@Injectable()
export class RedletterDayService{
  constructor(private http:HttpClient){}
  public findRedletterDayByCustomer():Promise<Array<RedletterDay>> {
  return new Promise((resolve,reject)=>{});
}
  public findRedletterDay():Promise<Array<RedletterDay>>{
    return new Promise((resolve,reject)=>{
      resolve([new RedletterDay({id:1,fdCustomer:new Customer({id:1,fdName:'张馨文'}),fdDate:'2017-12-30 14:20',fdContent:'客户生日'}),
        new RedletterDay({id:2,fdCustomer:new Customer({id:2,fdName:'戴总'}),fdDate:'2018-02-30 14:20',fdContent:'客户生日'}),
        new RedletterDay({id:3,fdCustomer:new Customer({id:3,fdName:'刘建忠'}),fdDate:'2018-02-30 14:20',fdContent:'客户生日'}),
        new RedletterDay({id:4,fdCustomer:new Customer({id:4,fdName:'蒋总'}),fdDate:'2018-03-13 14:20',fdContent:'客户生日'}),
        new RedletterDay({id:5,fdCustomer:new Customer({id:5,fdName:'黄虎'}),fdDate:'2018-04-18 14:20',fdContent:'客户生日'})]);
    });
  }
}
