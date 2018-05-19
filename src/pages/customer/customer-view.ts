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
import {tap} from "rxjs/operators";
import {Contract} from "../../_models/contract";
import {Followup} from "../../_models/followup";
import {CustomerEditPage} from "./customer-edit";

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
    Object.assign(this.customer,this.navParams.get("customer"));
    this.customer.fdContracts=[];
    this.customer.fdFollowups=[];
    this.contractService.findAll(this.customer.id,"",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Contract(item);
        });
        this.customer.fdContracts=this.customer.fdContracts.concat(records);
      })).subscribe();
    this.followupService.findAll("","",this.customer.id,"","+",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Followup(item);
        });
        this.customer.fdFollowups=this.customer.fdFollowups.concat(records);
      })).subscribe();
  }

  edit(){
    this.nav.push(CustomerEditPage,{fdCustomer:this.customer});
  }
}
