import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, LoadingController, Loading, Toast, ToastController} from "ionic-angular";
import {CustomerGradeService} from "../../_services/customer-grade.service";
import {CustomerLevelService} from "../../_services/customer-level.service";
import {CustomerSourceService} from "../../_services/customer-source.service";
import {CustomerTypeService} from "../../_services/customer-type.service";
import {CustomerPurposeService} from "../../_services/customer-purpose.service";
import {CustomerGrade} from "../../_models/customer-grade";
import {CustomerSource} from "../../_models/customer-source";
import {CustomerPurpose} from "../../_models/customer-prupose";
import {CustomerLevel} from "../../_models/customer-level";
import {CustomerService} from "../../_services/customer.service";

@Component({
  templateUrl:"customer-add.component.html",
  selector:"page-customer-add"
})

export class CustomerAddPage{
  private customer:Customer;
  //客户等级
  private fdGrades:Array<CustomerGrade>;
  //消费档次
  private fdConsumeLevels:Array<CustomerLevel>;
  //购买用途
  private fdBuyPurposes:Array<CustomerPurpose>;
  //客户类型
  private fdTypes:Array<CustomerGrade>;
  //客户来源
  private fdSources:Array<CustomerSource>;
  private loading:Loading;
  private toast:Toast;
  constructor(private nav:NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private customerGradeService:CustomerGradeService,private customerService: CustomerService, private customerLevelService:CustomerLevelService
    ,private customerPurposeService:CustomerPurposeService,private customerTypeService:CustomerTypeService,private customerSourceService:CustomerSourceService){
    this.customer=new Customer({});
    this.fdGrades=[];
    this.fdConsumeLevels=[];
    this.fdBuyPurposes=[];
    this.fdTypes=[];
    this.fdSources=[];
    this.customerGradeService.findAll().subscribe(result=>{this.fdGrades=result;});
    this.customerLevelService.findAll().subscribe(result=>{this.fdConsumeLevels=result;});
    this.customerPurposeService.findAll().subscribe(result=>{this.fdBuyPurposes=result;});
    this.customerTypeService.findAll().subscribe(result=>{this.fdTypes=result;});
    this.customerSourceService.findAll().subscribe(result=>{this.fdSources=result;});
    this.loading = this.loadingCtrl.create({
      content: '正在提交...'
    });
  }

  save(){
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    if(!this.customer.fdName){
      this.toast.setMessage("客户名称必填");
      this.toast.present();
      return;
    }
    if(!this.customer.fdTypeId){
      this.toast.setMessage("客户类型必填");
      this.toast.present();
      return;
    }
    if(!this.customer.fdSourceId){
      this.toast.setMessage("客户来源必填");
      this.toast.present();
      return;
    }
    if(!this.customer.fdPurposeId){
      this.toast.setMessage("购酒目的必填");
      this.toast.present();
      return;
    }
    if(!this.customer.fdLevelId){
      this.toast.setMessage("消费档次必填");
      this.toast.present();
      return;
    }
    this.loading.present();
    this.customerService.save(this.customer).subscribe(result=>{
      if(result){
        this.nav.pop();
      }
    },err=>{},()=>{
      this.loading.dismiss();
    });
  }
}
