import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Followup} from "../_models/followup";
import {Injectable} from "@angular/core";
import {Customer} from "../_models/customer";

@Injectable()
export class FollowupService{
  constructor(private http:HttpClient){}
  public findFollowupByCustomer():Promise<Array<Followup>> {
  return new Promise((resolve,reject)=>{});
}
  public findFollowup():Promise<Array<Followup>>{
    return new Promise((resolve,reject)=>{
      resolve([new Followup({id:1,fdCustomer:new Customer({id:1,fdName:'张馨文'}),fdTime:'2017-12-30 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"威尼期小船一份"}),
        new Followup({id:2,fdCustomer:new Customer({id:2,fdName:'戴总'}),fdTime:'2018-02-30 14:20',fdType:'上门',fdContent:'客户生日',fdGift:"无"}),
        new Followup({id:3,fdCustomer:new Customer({id:3,fdName:'刘建忠'}),fdTime:'2018-02-30 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"无"}),
        new Followup({id:4,fdCustomer:new Customer({id:4,fdName:'蒋总'}),fdTime:'2018-03-13 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"威尼期小船一份"}),
        new Followup({id:5,fdCustomer:new Customer({id:5,fdName:'黄虎'}),fdTime:'2018-04-18 14:20',fdType:'上门',fdContent:'客户生日',fdGift:"威尼期小船一份"})]);
    });
  }
}
