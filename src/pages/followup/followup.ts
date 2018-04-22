import {Component, Input} from "@angular/core";
import {FollowupService} from "../../_services/followup.service";
import {Followup} from "../../_models/followup";
import {NavParams, NavController} from "ionic-angular";
import {Customer} from "../../_models/customer";
@Component({
  templateUrl:"follow.html",
  selector:"page-follow"
})
export class FollowupPage{
 private followups:Array<Followup>;
  @Input() fdCustomer: Customer;
  constructor(private nav:NavController,private navParams:NavParams,private followupService:FollowupService){
  }
  ionViewWillEnter(){
    let fdOrigin=this.navParams.get("fdOrigin");
    switch(fdOrigin){
      case "customer":
        this.followupService.findFollowupByCustomer().then(res=>{
          this.followups=res;
        });
        break;
      default:
        this.followupService.findFollowup().then(res=>{
          this.followups=res;
        });
        break;
    }
  }
}
