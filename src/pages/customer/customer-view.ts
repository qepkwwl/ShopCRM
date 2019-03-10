import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavParams, NavController, ModalController, Loading, LoadingController} from "ionic-angular";
import {ContractService} from "../../_services/contract.service";
import {FollowupService} from "../../_services/followup.service";
import {tap} from "rxjs/operators";
import {Contract} from "../../_models/contract";
import {Followup} from "../../_models/followup";
import {CustomerEditPage} from "./customer-edit";
import {ContractProduct} from "../../_models/contractProduct";
import {ProductOpinionPage} from "../contract/modal/product-opinion";
import {UserService} from "../../_services/user.service";
import {BasePage} from "../base/BasePage";
import {CustomerPage} from "./customer";
import {CustomerService} from "../../_services/customer.service";

@Component({
  templateUrl:"customer-view.html",
  selector:"page-customer-view"
})
export  class CustomerViewPage extends BasePage{
  private customer:Customer;
  private loading:Loading;
  private isShowCustomerInfo=false;
  private isShowContractInfo=false;
  private isShowFollowupInfo=false;

  constructor(private nav:NavController,private modal:ModalController,private navParams:NavParams,private loadingCtrl:LoadingController,private customerService:CustomerService,private contractService:ContractService,private followupService:FollowupService,userService:UserService){
    super(userService);
    this.customer=new Customer();
    this.loading = this.loadingCtrl.create({
      content: '正在删除...'
    });
  }

  ionViewWillEnter(){
    Object.assign(this.customer,this.navParams.get("customer"));
    console.log(this.customer);
    this.customer.fdContracts=[];
    this.customer.fdFollowups=[];
    this.contractService.findAll(this.customer.id,"","","","","-",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Contract(item);
        });
        this.customer.fdContracts=this.customer.fdContracts.concat(records);
      })).subscribe();
    this.followupService.findAll("","",this.customer.id,"","+",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Followup(item);
        });
        this.customer.fdFollowups=this.customer.fdFollowups.concat(records);
      })).subscribe();
  }

  edit(){
    this.nav.push(CustomerEditPage,{fdCustomer:this.customer});
  }

  canDelete(){
    return  this.customer.fdCreatorId==this.userService.getUserId()&&this.customer.fdContractCount<=0;
  }

  delete(){
    if(!confirm("确认删除?")){
      return;
    }
    this.loading.present();
    this.customerService.delete(this.customer.id).subscribe(result=>{
      if(!result){
        alert("删除失败");
      }
      this.nav.pop();
    },err=>{},()=>{
      this.loading.dismiss();
    });
  }

  addOpinion(p:ContractProduct){
    let productModal=this.modal.create(ProductOpinionPage,{product:p});
    productModal.onDidDismiss(data=>{
      switch (data.result){
        case "save":
          var product=data.product;
          this.contractService.addOpinion(product).subscribe(data=>{
            if(data){
              p.fdOpinion=product.fdOpinion;
            }
          });
          break;
        case "back":
          break;
      }
    });
    productModal.present();
  }
}
