import {Component} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ContractProduct} from "../../../_models/contractProduct";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";

@Component({
  templateUrl:"contract-product.html",
  selector:"page-contract-product"
})
export  class ContractProductPage{
  private product:ContractProduct;
  private myform:FormGroup;
  constructor(private view: ViewController,private navParams:NavParams,private formBuilder: FormBuilder){
    this.product=new ContractProduct({});
  }
 ionViewDidLoad(){
    this.myform=this.formBuilder.group({
      fdRetailPrice:['请输入单价',Validators.compose([Validators.required,Validators.pattern('\\d+(\\.\\d+)?')])]
    });
 }
  ionViewWillEnter=function () {
    this.product=new ContractProduct(this.navParams.get("product"));
  }
  save() {
    this.view.dismiss({product:this.product,result:"save"});
  }

  back() {
    this.view.dismiss({result:"back"});
  }

  delete() {
    this.view.dismiss({product:this.product,result:"delete"});
  }
}
