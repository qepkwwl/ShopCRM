

import {BasePage} from "../../base/BasePage";
import {Component} from "@angular/core";
import {NavParams, ViewController, Events, NavController} from "ionic-angular";
import {CustomerPage} from "../../customer/customer";
import {Customer} from "../../../_models/customer";

@Component({
  templateUrl:"followup-search.html",
  selector:"page-followup-search"
})
export class FollowupSearchPage{
  //搜索的内容
  private fdCriterial:{fdDesc:string,fdOrder:string,fdName:string,fdCustomerId:number,fdCustomerName:string,fdStartDate:string,fdEndDate:string}

  public static SELECTED_CUSTOMER:string="FollowupQuery.select.customer.completed";
  constructor(private nav:NavController,private view: ViewController,private navParams:NavParams,private event:Events) {
    this.fdCriterial={fdDesc:"拜访记录",fdOrder:"-",fdName:"",fdCustomerId:0,fdCustomerName:'指定客户',fdStartDate:"",fdEndDate:""};
    this.event.subscribe(FollowupSearchPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
  }
  resetQuery(){
    this.fdCriterial={fdDesc:"拜访记录",fdOrder:"-",fdName:"",fdCustomerId:0,fdCustomerName:'指定客户',fdStartDate:"",fdEndDate:""};
    this.view.dismiss({fdCriterial:this.fdCriterial,result:"search"});
  }
  search(){
    this.fdCriterial.fdDesc="";
    if(!/^\s*$/.test(this.fdCriterial.fdName)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdName+" ";
    }
    if(this.fdCriterial.fdCustomerId>0){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdCustomerName+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdStartDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdStartDate+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdEndDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdEndDate+" ";
    }
    if(/^\s*$/.test(this.fdCriterial.fdDesc)){
      this.fdCriterial.fdDesc="拜访记录";
    }
    this.view.dismiss({fdCriterial:this.fdCriterial,result:"search"});
  }
  back() {
    this.view.dismiss({result:"back"});
  }

  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'followup-query',fdCustomerId:this.fdCriterial.fdCustomerId});
  }

  private afterSelectedCustomer=(c:Customer)=>{
    if(c){
      this.fdCriterial.fdCustomerId=c.id;
      this.fdCriterial.fdCustomerName=c.fdName;
    }
  }
}
