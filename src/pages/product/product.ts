import {Component} from "@angular/core";
import { File } from '@ionic-native/file';
import {Product} from "../../_models/product";
import {NavController, NavParams, Events, InfiniteScroll} from "ionic-angular";
import {ContractAddPage} from "../contract/contract-add.component";
import {ProductService} from "../../_services/product.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AppService} from "../../_services/app.service";

@Component({
  templateUrl:"product.html",
  selector:"page-product"
})
export  class ProductPage {
  //是否显示搜索框
  private isShowSearch:boolean=false;
  //搜索的内容
  private fdSearchValue:string='';
  //商品列表
  private products:Array<Product>;
  //商品列表
  private selectedProducts:Array<Product>;
  private afterSelectedProduct:any;
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  private fdOrigin:string;
  constructor(private nav :NavController,private navParams:NavParams,private event:Events,private file: File,private productService:ProductService,private appService:AppService){
  }
  urlForImage = function(imageId:string) {
    var trueOrigin = "assets/imgs/product/image"+imageId+".jpeg";
    return trueOrigin;
  }
  search(ev: any){
    this.fdSearchValue=ev.target.value;
    this.indexPage=0;
    this.products=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.productService.findAll(this.fdSearchValue,this.indexPage).pipe(
      tap(data=>{
        let newRecords=data.content.map(item=>{
          return new Product(item);
        });
        for(let i=newRecords.length-1;i>=0;i--){
          let p=newRecords[i];
          p.fdImageUrl=this.appService.baseUrl+"/bz/product/main/image/"+p.id+".jpg?version="+p.fdModifyTime;
          for(let j=this.selectedProducts.length-1;j>=0;j--){
            if(p.id==this.selectedProducts[j].id){
              p.fdIsChecked=true;
              break;
            }
          }
        }
        this.products=this.products.concat(newRecords);
        this.indexPage++;
        this.hasMoreRecords=data.totalPages>this.indexPage;
      }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }
  //鼠标点击时选中
  selected(p){
    if(this.fdOrigin=="contract"){
      p.fdIsChecked=!p.fdIsChecked;
      if(p.fdIsChecked){
        this.selectedProducts.push(new Product(p));
      }else{
        for(let i=this.selectedProducts.length-1;i>=0;i--){
          let _p=this.selectedProducts[i];
          if(_p.id==p.id){
            this.selectedProducts.splice(i,1);
          }
        }
      }
    }
  }
  ionViewWillEnter(){
    this.selectedProducts=[];
    this.products=[];
    this.indexPage=0;
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "contract":
        let fdSelectedProducts=this.navParams.get("fdSelectedProducts");
        for(let i=fdSelectedProducts.length-1;i>=0;i--){
          this.selectedProducts.push(new Product(fdSelectedProducts[i]));
        }
        break;
    }
    this.loadData().subscribe();
  }
  ionViewWillLeave() {
    this.event.publish(ContractAddPage.SELECTED_PRODUCT,this.selectedProducts);
  }
}
