import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Followup} from "../_models/followup";
import {Injectable} from "@angular/core";

@Injectable()
export class FollowupService{
  constructor(private http:HttpClient){}
  public findFollowupByCustomer():Promise<Array<Followup>> {
  return new Promise((resolve,reject)=>{});
}
  public findFollowup():Promise<Array<Followup>>{
    return new Promise((resolve,reject)=>{
      resolve([new Followup({id:1,fdCustomerId:1,fdCustomerName:'张馨文',fdTime:'2017-12-30 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"威尼期小船一份"}),
        new Followup({id:2,fdCustomerId:2,fdCustomerName:'戴总',fdTime:'2018-02-30 14:20',fdType:'上门',fdContent:'客户生日',fdGift:"无"}),
        new Followup({id:3,fdCustomerId:3,fdCustomerName:'刘建忠',fdTime:'2018-02-30 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"无"}),
        new Followup({id:4,fdCustomerId:4,fdCustomerName:'蒋总',fdTime:'2018-03-13 14:20',fdType:'电话',fdContent:'客户生日',fdGift:"威尼期小船一份"}),
        new Followup({id:5,fdCustomerId:5,fdCustomerName:'黄虎',fdTime:'2018-04-18 14:20',fdType:'上门',fdContent:'客户生日',fdGift:"威尼期小船一份"})]);
    });
  }
}
