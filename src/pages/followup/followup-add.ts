import {Component} from "@angular/core";
import {Followup} from "../../_models/followup";
import {IonicPage, IonicModule, NavParams, NavController} from "ionic-angular";
import {FollowupService} from "../../_services/followup.service";
@Component({
  templateUrl:"follow-add.html",
  selector:"page-follow-add"
})
export class FollowupAddPage {
  private followup:Followup;
  public static SELECTED_CUSTOMER:string="Followup.select.customer.completed";
  constructor( private nav:NavController,private navParams:NavParams,private followupService:FollowupService){
    this.followup=new Followup();
  }

  ionViewWillEnter(){
    let fdOrigin=this.navParams.get("fdOrigin");
    switch(fdOrigin){
      case "customer":
        let fdCustomer=this.navParams.get("fdCustomer");
        console.log(fdCustomer);
        this.followup.fdCustomerId=fdCustomer.id;
        this.followup.fdCustomerName=fdCustomer.fdName;
        break;
      default:
        break;
    }
  }
  save(){

  };
}
