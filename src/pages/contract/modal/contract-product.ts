import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {ContractProduct} from "../../../_models/contractProduct";
import {FormGroup, Validators, FormBuilder, NgForm} from "@angular/forms";

@Component({
  templateUrl:"contract-product.html",
  selector:"page-contract-product"
})
export  class ContractProductPage{
  private product:ContractProduct;
  @ViewChild("myForm") myForm:NgForm;
  constructor(private view: ViewController,private navParams:NavParams,private formBuilder: FormBuilder){
    this.product=new ContractProduct({});
  }
 ngOnInit(){
 }
  ionViewWillEnter=function () {
    this.product=new ContractProduct(this.navParams.get("product"));
  }
  save() {
   if(!/^\d+(\.\d+)?$/ig.test(this.product.fdRetailPrice+"")){
     alert("请输入合适的单价");
     return;
   }
    this.view.dismiss({product:this.product,result:"save"});
  }
  onSubmit() {
    console.log(this.myForm);
  }
  back() {
    this.view.dismiss({result:"back"});
  }

  delete() {
    this.view.dismiss({product:this.product,result:"delete"});
  }
}
