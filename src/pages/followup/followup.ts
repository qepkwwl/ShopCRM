import {Component, Input} from "@angular/core";
import {FollowupService} from "../../_services/followup.service";
import {Followup} from "../../_models/followup";
import {NavParams, NavController} from "ionic-angular";
import {Customer} from "../../_models/customer";
import {FollowupAddPage} from "./followup-add";
@Component({
  templateUrl:"followup.html",
  selector:"page-followup"
})
export class FollowupPage{
 private followups:Array<Followup>;
  private fdOrigin:string;
  constructor(private nav:NavController,private navParams:NavParams,private followupService:FollowupService){
    this.followups=[];
  }
  ionViewDidLoad(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
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

  add(){
    this.nav.push(FollowupAddPage);
  }
}
