import {Component, ViewChild} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {ContractProduct} from "../../../_models/contractProduct";

@Component({
  templateUrl:"product-opinion.html",
  selector:"page-product-opinion"
})
export class ProductOpinionPage{
  private contractProduct:ContractProduct;

  @ViewChild('fdContent') fdContent: any;
  constructor(private view: ViewController,private navParams:NavParams){
    this.reset();
  }
  ionViewWillEnter=function () {
    this.contractProduct=new ContractProduct(this.navParams.get("product"));
  }
  ionViewDidLoaded() {
    setTimeout(() => {
      this.fdContent.setFocus();
    },150);

  }
  reset(){
    this.contractProduct=new ContractProduct();
  }
  save() {
    this.view.dismiss({product:this.contractProduct,result:"save"});
  }
  resize() {
    //this.fdContent.nativeElement.style.height = this.fdContent.nativeElement.scrollHeight + 'px';
  }
  back() {
    this.view.dismiss({result:"back"});
  }
}
