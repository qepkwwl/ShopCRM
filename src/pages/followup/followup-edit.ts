import {Component} from "@angular/core";
import {Followup} from "../../_models/followup";
import {NavParams, NavController, Events, ToastController, LoadingController, Toast, Loading} from "ionic-angular";
import {FollowupService} from "../../_services/followup.service";
import {CustomerPage} from "../customer/customer";
import {Customer} from "../../_models/customer";
import {FollowupType} from "../../_models/followup-type";
import {FollowupTypeService} from "../../_services/followup-type.service";
@Component({
  templateUrl:"follow-edit.html",
  selector:"page-follow-edit"
})
export class FollowupEditPage {
  private followup:Followup;
  private fdFollowTypes:Array<FollowupType>;
  private loading:Loading;
  private toast:Toast;

  public static SELECTED_CUSTOMER:string="FollowupEdit.select.customer.completed";
  constructor( private nav:NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private navParams:NavParams,private event:Events,private followupService:FollowupService,private followupTypeService:FollowupTypeService){
    this.followup=new Followup();
    this.fdFollowTypes=[];
    this.followupTypeService.findAll().subscribe(result=>{this.fdFollowTypes=result;});
    this.event.subscribe(FollowupEditPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
    this.loading = this.loadingCtrl.create({
      content: '正在提交...'
    });
  }

  ionViewWillEnter(){
    let fdOrigin=this.navParams.get("fdOrigin");
    switch(fdOrigin){
      case "followup":console.log("sdf");
        this.followup=this.navParams.get("fdFollowup");
        break;
      default:
        break;
    }
  }
  private afterSelectedCustomer=(c:Customer)=>{
    if(c){
      this.followup.fdCustomerId=c.id;
      this.followup.fdCustomerName=c.fdName;
    }
}
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'followup-edit',fdCustomerId:this.followup.fdCustomerId});
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
    if(!this.followup.fdDate){
      this.toast.setMessage("拜访日期必填");
      this.toast.present();
      return;
    }
    if(!this.followup.fdContent){
      this.toast.setMessage("拜访内容必填");
      this.toast.present();
      return;
    }
    this.loading.present();
    this.followupService.update(this.followup).subscribe(result=>{
      if(result){
        this.nav.pop();
      }
    },err=>{},()=>{
      this.loading.dismiss();
    });
  };
}
