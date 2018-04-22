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

@Component({
  templateUrl:"customer-view.html",
  selector:"page-customer-view"
})
export  class CustomerViewPage{
  @Input() customer:Customer;
  constructor(private nav:NavController,private navParams:NavParams,private  event:Events,private customerService:CustomerService){
  }

  ionViewWillEnter(){
    this.customer=this.navParams.get("fdCustomer");
    console.log(this.customer);
  }
}
