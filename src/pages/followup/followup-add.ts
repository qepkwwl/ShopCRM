import {Component} from "@angular/core";
import {Followup} from "../../_models/followup";
import {IonicPage, IonicModule, NavParams, NavController, Events} from "ionic-angular";
import {FollowupService} from "../../_services/followup.service";
import {CustomerPage} from "../customer/customer";
import {Customer} from "../../_models/customer";
@Component({
  templateUrl:"follow-add.html",
  selector:"page-follow-add"
})
export class FollowupAddPage {
  private followup:Followup;
  public static SELECTED_CUSTOMER:string="Followup.select.customer.completed";
  constructor( private nav:NavController,private navParams:NavParams,private event:Events,private followupService:FollowupService){
    this.followup=new Followup();
    this.event.subscribe(FollowupAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer)
  }

  ionViewWillEnter(){
    let fdOrigin=this.navParams.get("fdOrigin");
    switch(fdOrigin){
      case "customer":
        let fdCustomer=this.navParams.get("fdCustomer");
        this.afterSelectedCustomer(fdCustomer);
        break;
      default:
        break;
    }
  }
  private afterSelectedCustomer=(c:Customer)=>{
    this.followup.fdCustomer=new Customer(c);
}
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'followup',fdCustomer:this.followup.fdCustomer});
  }
  save(){

  };
}
