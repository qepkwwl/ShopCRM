import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {ContractProduct} from "../../_models/contractProduct";
import {
  NavController,
  ModalController,
  NavParams,
  Toast,
  Loading,
  LoadingController,
  ToastController, Events
} from "ionic-angular";
import {ProductPage} from "../product/product";
import {CustomerPage} from "../customer/customer";
import {ContractCustomer} from "../../_models/contractCustomer";
import {Customer} from "../../_models/customer";
import {Product} from "../../_models/product";
import {ContractProductPage} from "./modal/contract-product";
import {ContractService} from "../../_services/contract.service";

@Component({
  templateUrl:"contract-add.component.html",
  selector:"page-contract-add"
})
export class ContractAddPage{
  public static SELECTED_PRODUCT:string="Contract.select.product.completed";
  public static SELECTED_CUSTOMER:string="Contract.select.customer.completed";
  //合同
  private contract:Contract;
  private fdOrigin:string;
  private loading:Loading;
  private toast:Toast;
  constructor(private nav:NavController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private navParams:NavParams,private modal :ModalController,private event :Events,private contractService:ContractService){
    this.reset();
    this.event.subscribe(ContractAddPage.SELECTED_PRODUCT,this.afterSelectedProduct)
    this.event.subscribe(ContractAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
    this.loading = this.loadingCtrl.create({
      content: '正在提交...'
    });
  }
  reset(){
    this.contract=new Contract({fdCustomer:new ContractCustomer({fdName:'选择客户'})});
    this.contract.fdProducts=[];
  }
  insertNewProduct(){
    this.nav.push(ProductPage,{fdOrigin:'contract',contract:this.contract});
  }

  ionViewWillEnter() {
    this.fdOrigin = this.navParams.get("fdOrigin");

    switch (this.fdOrigin){
      case "customer"://指定客户来新建合同时
        let customer=this.navParams.get("fdCustomer");
        this.afterSelectedCustomer(customer);
        break;
      default:
        break;
    }
  }
  editProduct(p:ContractProduct){
    let productModal=this.modal.create(ContractProductPage,{product:p});
    productModal.onDidDismiss(data=>{
      switch (data.result){
        case "save":
            this.contract.fdProducts.forEach((item,index)=>{
              var product=data.product;
              if(item.id==product.id){
                this.contract.fdProducts.splice(index,1,new ContractProduct(product));
                return false;
              }
            });
          break;
        case "back":
          break;
        case "delete":
          this.contract.fdProducts.forEach((item,index)=>{
            if(item.id==data.product.id){
              this.contract.fdProducts.splice(index,1);
              return false;
            }
          });
          break;
      }
      this.updateContractTotal();
    });
    productModal.present();
  }
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'contract'});
  }
  private afterSelectedProduct=(_contract:Contract)=>{
    this.contract=_contract;
    this.updateContractTotal();
  }
  //更新合同总价
  updateContractTotal=function () {
    var total=0;
    this.contract.fdProducts.forEach(item=>{
      item.fdTotal=item.fdNum*(item.fdRetailPrice||0);
      total+=item.fdNum*(item.fdRetailPrice||0);
    });

    if(this.contract.fdIsSale=="false"){
      total*=-1;
    }
    this.contract.fdTotal=total;
  }
  private afterSelectedCustomer=(selectedCustomer:Customer)=>{
    this.contract.fdCustomerId=selectedCustomer.id;
    this.contract.fdCustomerName=selectedCustomer.fdName;
  }

  save(){
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    if(!this.contract.fdStartTime){
      this.toast.setMessage("开始日期必填");
      this.toast.present();
      return;
    }
    if(!this.contract.fdCustomerId){
      this.toast.setMessage("客户需要指定");
      this.toast.present();
      return;
    }
    if(this.contract.fdTotal==0){
      this.toast.setMessage("请维护产品");
      this.toast.present();
      return;
    }
    for(let p of this.contract.fdProducts){
      if(p.fdTotal==0){
        this.toast.setMessage(`${p.fdName}输入不正确`);
        this.toast.present();
        return;
      }
    }
    this.loading.present();
    this.contractService.save(this.contract).subscribe(result=>{
      if(result){
        this.nav.pop();
      }
    },err=>{},()=>{
      this.loading.dismiss();
    });
  }
  changeContractType(){
    this.updateContractTotal();
  }
}

