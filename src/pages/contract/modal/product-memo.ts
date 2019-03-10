import {Component, ViewChild} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {MemoItem} from "../../../_models/MemoItem";
import {ContractProduct} from "../../../_models/contractProduct";

@Component({
  templateUrl:"product-memo.html",
  selector:"page-product-memo"
})
export  class ProductMemoPage{
  private product:ContractProduct;

  @ViewChild('fdContent') fdContent: any;
  constructor(private view: ViewController,private navParams:NavParams){
    this.reset();
  }
  ionViewWillEnter=function () {
    this.product=this.navParams.get("product");
    console.log("ss:");
    console.log(this.product);
  }
  ionViewDidLoaded() {


  }
  reset(){
    this.product=new ContractProduct();
  }
  save() {
    this.view.dismiss({product:this.product,result:"save"});
  }
  back() {
    this.view.dismiss({result:"back"});
  }
}
