import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, NavParams} from "ionic-angular";

@Component({
  templateUrl:"customer-add.component.html",
  selector:"page-customer-add"
})

export class CustomerAddPage{
  private customer:Customer;
  //客户等级
  private fdGrades:Array<string>;
  //消费档次
  private fdConsumeLevels:Array<string>;
  //购买用途
  private fdBuyPurposes:Array<string>;
  //客户类型
  private fdTypes:Array<string>;
  constructor(private nav:NavController,private navParams:NavParams,){
    this.customer=new Customer({});
    this.fdGrades=["普通","重点"];
    this.fdConsumeLevels=["100以下","100-300","300-500以上","500以上"];
    this.fdBuyPurposes=["分销","自饮","送礼"];
    this.fdTypes=["团购","渠道","经销","其他"];
  }

  save(){

  }
}
