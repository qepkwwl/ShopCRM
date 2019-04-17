import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {NavParams, Loading, LoadingController, NavController, ModalController} from "ionic-angular";
import {ContractService} from "../../_services/contract.service";
import {ContractEditPage} from "./contract-edit.component";
import * as moment from "moment";
import {UserService} from "../../_services/user.service";
import {BasePage} from "../base/BasePage";
import {ContractProduct} from "../../_models/contractProduct";
import {ProductMemoPage} from "./modal/product-memo";

@Component({
  templateUrl:"contract-view.component.html",
  selector:"page-contract-view"
})
export class ContractViewPage extends BasePage{
  //合同
  private contract:Contract;
  private loading:Loading;
  //是否允许编辑
  private  canEdit:boolean=false;
  constructor(private nav:NavController,private navParams:NavParams,private modal:ModalController,private loadingCtrl:LoadingController,private contractService:ContractService,userService:UserService){
    super(userService);
    this.contract=new Contract();
    this.loading = this.loadingCtrl.create({
      content: '正在删除...'
    });
  }

  ionViewWillEnter(){
    let fdContract=this.navParams.get("fdContract");
    this.contract=new Contract(fdContract);
    var now=moment().format("YYYY-MM-DD");
    this.canEdit=!this.isAdmin&&this.contract.fdCreateTime==now&&this.contract.fdCreatorId==this.userService.getUserId();
  }

  delete(){
    if(!confirm("确认删除?")){
      return;
    }
    this.loading.present();
    this.contractService.delete(this.contract.id).subscribe(result=>{
      if(result.indexOf("操作成功")==-1){
        alert("删除失败");
      }
      this.nav.pop();
    },err=>{},()=>{
      this.loading.dismiss();
    });
  }

  edit(){
    localStorage.setItem("fdOrigin","viewContract");
    this.nav.push(ContractEditPage,{fdOrigin:"viewContract",fdContract:this.contract});
  }


  editMemo(p:ContractProduct){
    let productModal=this.modal.create(ProductMemoPage,{product:p});
    productModal.onDidDismiss(data=>{
      switch (data.result){
        case "save":
          this.contract.fdProducts.forEach((item,index)=>{
            var product=data.product;
            if(item.id==product.id){
              this.contractService.setProductRemark(product).subscribe(data=>{
                if(data){
                  item.fdRemark=product.fdRemark;
                }else{
                  alert("备注写入失败");
                }
              });
              return false;
            }
          });
          break;
        case "back":
          break;
        case "delete":
          break;
      }
    });
    productModal.present();
  }
}

