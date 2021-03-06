import {Component} from "@angular/core";
import {ViewController, Toast, ToastController, NavParams} from "ionic-angular";
import {ContractProduct} from "../../../_models/contractProduct";
import {ContractProductType} from "../../../_models/contractProduct-type";
import {ContractProductTypeService} from "../../../_services/contractproduct-type.service";

@Component({
  templateUrl:"contract-product.html",
  selector:"page-contract-product"
})
export  class ContractProductPage{
  private product:ContractProduct;
  //客户类型
  private fdSaleTypes:Array<ContractProductType>;
  private toast:Toast;
  constructor(private view: ViewController,private navParams:NavParams,private toastCtrl:ToastController,private contractProductTypeService: ContractProductTypeService){
    this.fdSaleTypes=[];
    this.contractProductTypeService.findAll().subscribe(result=>{this.fdSaleTypes=result;});
    this.product=new ContractProduct({});
  }
 ngOnInit(){
 }
  ionViewWillEnter=function () {
    this.product=new ContractProduct(this.navParams.get("product"));
  }
  save() {
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
   if(!/^\d+(\.\d+)?$/ig.test(this.product.fdRetailPrice+"")){
     this.toast.setMessage("请输入合适的单价");
     this.toast.present();
     return;
   }
   if(this.product.fdGardePrice==0){
     this.product.fdDiscount=0;
   }else{
     this.product.fdDiscount=parseFloat((this.product.fdRetailPrice/this.product.fdGardePrice).toFixed(2));
   }

    if(/^\s*$/ig.test(this.product.fdSaleType+"")){
      this.toast.setMessage("请输入销售类型");
      this.toast.present();
      return;
    }
    this.view.dismiss({product:this.product,result:"save"});
  }
  back() {
    this.view.dismiss({result:"back"});
  }

  delete() {
    this.view.dismiss({product:this.product,result:"delete"});
  }
}
