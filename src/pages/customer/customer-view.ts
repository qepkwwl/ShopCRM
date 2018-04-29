import {Component, Input} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, Events, NavParams} from "ionic-angular";
import {CustomerAddPage} from "./customer-add.component";
import {LoginPage} from "../login/login";
import {ContractAddPage} from "../contract/contract-add.component";
import {FollowupAddPage} from "../followup/followup-add";
import {FollowupPage} from "../followup/followup";
import {ContractPage} from "../contract/contract";
import {CustomerService} from "../../_services/customer.service";
import {ContractService} from "../../_services/contract.service";
import {FollowupService} from "../../_services/followup.service";

@Component({
  templateUrl:"customer-view.html",
  selector:"page-customer-view"
})
export  class CustomerViewPage{
  private customer:Customer;
  constructor(private nav:NavController,private navParams:NavParams,private  event:Events,private customerService:CustomerService,private contractService:ContractService,private followupService:FollowupService){
    this.customer=new Customer();
  }

  ionViewWillEnter(){
    this.customer=this.navParams.get("customer");
    this.customer.fdContracts=[];
    this.customer.fdFollowups=[];
    this.contractService.findContract().subscribe({next(data){
      this.customer.fdContracts=data;
    }});
    this.followupService.findFollowup().then(data=>{
      this.customer.fdFollowups=data;
    });
  }
}
