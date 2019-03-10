import {Component} from "@angular/core";
import {Product} from "../../_models/product";
import {NavParams, Events, InfiniteScroll} from "ionic-angular";
import {ContractAddPage} from "../contract/contract-add.component";
import {ProductService} from "../../_services/product.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {AppService} from "../../_services/app.service";
import {ContractEditPage} from "../contract/contract-edit.component";
import {Contract} from "../../_models/contract";
import {ContractProduct} from "../../_models/contractProduct";

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
  private contract:Contract;
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  //按指导价排序
  private fdOrder:string="+";
  private fdOrigin:string;
  constructor(private navParams:NavParams,private event:Events,private productService:ProductService,private appService:AppService){
    this.isShowSearch=false;
  }
  urlForImage = function(imageId:string) {
    var trueOrigin = "assets/imgs/product/image"+imageId+".jpeg";
    return trueOrigin;
  }
  search(ev: any){
    this.fdSearchValue=ev.target.value||'';
    this.indexPage=0;
    this.products=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.productService.findAll(this.fdSearchValue,this.fdOrder,this.indexPage).pipe(
      tap(data=>{
        let newRecords=data.content.map(item=>{
          return new Product(item);
        });
        for(let i=newRecords.length-1;i>=0;i--){
          let p=newRecords[i];
          p.fdImageUrl=this.appService.baseUrl+"/bz/product/main/image/"+p.id+".jpg?version="+p.fdModifyTime;
          if(!this.contract)
            this.contract=new Contract();
          for(let j=this.contract.fdProducts.length-1;j>=0;j--){
            if(p.id==this.contract.fdProducts[j].id){
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
        let contractProduct=new ContractProduct(p);
        contractProduct.fdNum=1;
        contractProduct.fdRetailPrice=p.fdGardePrice;
        this.contract.fdProducts.push(contractProduct);
      }else{
        for(let i=this.contract.fdProducts.length-1;i>=0;i--){
          let _p=this.contract.fdProducts[i];
          if(_p.id==p.id){
            this.contract.fdProducts.splice(i,1);
          }
        }
      }
    }
  }
  orderSearch(){
    this.fdOrder=(this.fdOrder=='+'?'-':'+');
    this.indexPage=0;
    this.products=[];
    this.loadData().subscribe();
  }
  ionViewWillEnter(){
    this.products=[];
    this.indexPage=0;
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "contract":{
          this.contract=this.navParams.get("contract");
        }
        break;
      case "contract-edit":{
          this.contract=this.navParams.get("contract");
        }
        break;
    }
    this.loadData().subscribe();
  }
  ionViewWillLeave() {

    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "contract":
        this.event.publish(ContractAddPage.SELECTED_PRODUCT,this.contract);
        break;
      case "contract-edit":
        this.event.publish(ContractEditPage.SELECTED_PRODUCT,this.contract);
        break;
    }
  }
}
