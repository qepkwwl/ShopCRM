import {Component, Input} from "@angular/core";
import {NavParams, NavController} from "ionic-angular";
import {Customer} from "../../_models/customer";
import {RedletterDayService} from "../../_services/redletter-day.service";
import {RedletterDay} from "../../_models/redletter-day";
import {RedletterDayAddPage} from "./redletter-add";
@Component({
  templateUrl:"redletter.html",
  selector:"page-redletter"
})
export class RedletterDayPage{
 private redletterDaies:Array<RedletterDay>;
  private fdOrigin:string;
  constructor(private nav:NavController,private navParams:NavParams,private redletterDayService:RedletterDayService){
    this.redletterDaies=[];
  }
  ionViewDidLoad(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "customer":
        this.redletterDayService.findRedletterDayByCustomer().then(res=>{
          this.redletterDaies=res;
        });
        break;
      default:
        console.log(1);
        this.redletterDayService.findRedletterDay().then(res=>{
          this.redletterDaies=res;
        });
        break;
    }

    console.log(2);
  }

  add(){
    this.nav.push(RedletterDayAddPage);
  }
}
