import {Component} from "@angular/core";
import {Followup} from "../../_models/followup";
import {
  IonicPage, IonicModule, NavParams, NavController, Events, ToastController,
  LoadingController, Toast, Loading
} from "ionic-angular";
import {FollowupService} from "../../_services/followup.service";
import {CustomerPage} from "../customer/customer";
import {Customer} from "../../_models/customer";
@Component({
  templateUrl:"follow-add.html",
  selector:"page-follow-add"
})
export class FollowupAddPage {
  private followup:Followup;

  private loading:Loading;
  private toast:Toast;

  public static SELECTED_CUSTOMER:string="Followup.select.customer.completed";
  constructor( private nav:NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private navParams:NavParams,private event:Events,private followupService:FollowupService){
    this.followup=new Followup();
    this.event.subscribe(FollowupAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
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
    this.followup.fdCustomerId=c.id;
    this.followup.fdCustomerName=c.fdName;
}
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'followup',fdCustomerId:this.followup.fdCustomerId});
  }
  save(){
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    if(!this.followup.fdCustomerId){
      this.toast.setMessage("客户名称必填");
      this.toast.present();
      return;
    }
    if(!this.followup.fdTime){
      this.toast.setMessage("拜访时间必填");
      this.toast.present();
      return;
    }
    if(!this.followup.fdContent){
      this.toast.setMessage("拜访内容必填");
      this.toast.present();
      return;
    }
    this.loading.present();
    this.followupService.save(this.followup).subscribe(result=>{
      if(result){
        this.nav.pop();
      }
    },err=>{},()=>{
      this.loading.dismiss();
    });
  };
}
