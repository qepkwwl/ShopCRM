import {Component} from "@angular/core";
import {NavParams, NavController, Events, ToastController, LoadingController, Toast, Loading} from "ionic-angular";
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
  private loading:Loading;
  private toast:Toast;

  public static SELECTED_CUSTOMER:string="RedletterDay.select.customer.completed";
  constructor( private nav:NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private navParams:NavParams,private event:Events,private redletterDayService:RedletterDayService){
    this.redletterDay=new RedletterDay();
    this.event.subscribe(RedletterDayAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
    this.loading = this.loadingCtrl.create({
      content: '正在提交...'
    });
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
    this.redletterDay.fdCustomerId=c.id;
    this.redletterDay.fdCustomerName=c.fdName;
}
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'redletterDay',fdCustomer:this.redletterDay.fdCustomerId});
  }
  save(){
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    this.loading.present();
    this.redletterDayService.save(this.redletterDay).subscribe(result=>{
      if(result){
        this.nav.pop();
      }
    },err=>{},()=>{
      this.loading.dismiss();
    });
  };
}
