import {Component} from "@angular/core";
import {IonicPage, IonicModule, NavParams, NavController, Events} from "ionic-angular";
import {CustomerPage} from "../customer/customer";
import {Customer} from "../../_models/customer";
import {RedletterDayService} from "../../_services/redletter-day.service";
import {RedletterDay} from "../../_models/redletter-day";
@Component({
  templateUrl:"redletter-add.html",
  selector:"page-redletter-add"
})
export class RedletterDayAddPage {
  private redletterDay:RedletterDay;
  public static SELECTED_CUSTOMER:string="RedletterDay.select.customer.completed";
  constructor( private nav:NavController,private navParams:NavParams,private event:Events,private redletterDayService:RedletterDayService){
    this.redletterDay=new RedletterDay();
    this.event.subscribe(RedletterDayAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer)
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
    this.redletterDay.fdCustomer=new Customer(c);
}
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'redletterDay',fdCustomer:this.redletterDay.fdCustomer});
  }
  save(){

  };
}
