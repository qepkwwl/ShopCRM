import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavParams, NavController, ModalController} from "ionic-angular";
import {ContractService} from "../../_services/contract.service";
import {FollowupService} from "../../_services/followup.service";
import {tap} from "rxjs/operators";
import {Contract} from "../../_models/contract";
import {Followup} from "../../_models/followup";
import {CustomerEditPage} from "./customer-edit";
import {ContractProduct} from "../../_models/contractProduct";
import {ProductOpinionPage} from "../contract/modal/product-opinion";

@Component({
  templateUrl:"customer-view.html",
  selector:"page-customer-view"
})
export  class CustomerViewPage{
  private customer:Customer;
  private isShowCustomerInfo=false;
  private isShowContractInfo=false;
  private isShowFollowupInfo=false;
  constructor(private nav:NavController,private modal:ModalController,private navParams:NavParams,private contractService:ContractService,private followupService:FollowupService){
    this.customer=new Customer();
  }

  ionViewWillEnter(){
    Object.assign(this.customer,this.navParams.get("customer"));
    this.customer.fdContracts=[];
    this.customer.fdFollowups=[];
    this.contractService.findAll(this.customer.id,"","","","","",0).pipe(
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
