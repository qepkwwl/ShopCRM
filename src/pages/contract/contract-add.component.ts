import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {ContractProduct} from "../../_models/contractProduct";
import {NavController, ModalController, Events, NavParams} from "ionic-angular";
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
  constructor(private nav:NavController,private navParams:NavParams,private event:Events,private modal :ModalController,private contractService:ContractService){
    this.reset();
    event.subscribe(ContractAddPage.SELECTED_PRODUCT,this.afterSelectedProduct)
    event.subscribe(ContractAddPage.SELECTED_CUSTOMER,this.afterSelectedCustomer)
  }
  reset(){
    this.contract=new Contract({fdCustomer:new ContractCustomer({fdName:'选择客户'})});
    this.contract.fdProducts=[];
  }
  insertNewProduct(){
    this.nav.push(ProductPage,{fdOrigin:'contract'});
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
  private afterSelectedProduct=(selectedProductIds:Array<Product>)=>{
    this.contract.fdProducts=this.contract.fdProducts.concat(selectedProductIds.map((item,index)=>{
      let contractProduct= new ContractProduct(item);
      contractProduct.fdNum=1;
      return contractProduct;
    }));
    this.updateContractTotal();
  }
  //更新合同总价
  updateContractTotal=function () {
    var total=0;
    this.contract.fdProducts.forEach(item=>{
      total+=item.fdNum*(item.fdRetailPrice||0);
    });
    this.contract.fdTotal=total;
  }
  private afterSelectedCustomer=(selectedCustomer:Customer)=>{
    this.contract.fdCustomer=new ContractCustomer(selectedCustomer);
  }

  submitForm(){
  }
}

