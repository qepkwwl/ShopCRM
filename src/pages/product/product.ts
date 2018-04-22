import {Component} from "@angular/core";
import { File } from '@ionic-native/file';
import {Product} from "../../_models/product";
import {NavController, NavParams, Events} from "ionic-angular";
import {ContractAddPage} from "../contract/contract-add.component";
import {ProductService} from "../../_services/product.service";

@Component({
  templateUrl:"product.html",
  selector:"page-product"
})
export  class ProductPage {
  //是否显示搜索框
  private isShowSearch:boolean=false;
  //商品列表
  private products:Array<Product>;
  //商品列表
  private selectedProducts:Array<Product>;
  private afterSelectedProduct:any;
  private fdOrigin:string;
  constructor(private nav :NavController,private navParams:NavParams,private event:Events,private file: File,private productService:ProductService){
  }
  urlForImage = function(imageId:string) {
    var trueOrigin = "assets/imgs/product/image"+imageId+".jpeg";
    return trueOrigin;
  }
  //鼠标点击时选中
  selected(p){
    this.fdOrigin=="contract"&&(p.fdIsChecked=!p.fdIsChecked);
  }
  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "contract":

        break;
    }
    this.productService.findProduct().then(res=>{
      this.products=res;
    });
  }
  ionViewWillLeave() {
    var selectedProducts=this.products.filter((item,index)=>{
      return item.fdIsChecked;
    });
    this.event.publish(ContractAddPage.SELECTED_PRODUCT,selectedProducts);
  }
}
