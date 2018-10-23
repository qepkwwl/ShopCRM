import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {NavParams, Loading, LoadingController, NavController} from "ionic-angular";
import {ContractService} from "../../_services/contract.service";
import {ContractEditPage} from "./contract-edit.component";
import * as moment from "moment";
import {UserService} from "../../_services/user.service";

@Component({
  templateUrl:"contract-view.component.html",
  selector:"page-contract-view"
})
export class ContractViewPage{
  //合同
  private contract:Contract;
  private loading:Loading;
  //是否允许编辑
  private  canEdit:boolean=false;
  constructor(private nav:NavController,private navParams:NavParams,private loadingCtrl:LoadingController,private contractService:ContractService,private userService:UserService){
    this.contract=new Contract();
    this.loading = this.loadingCtrl.create({
      content: '正在删除...'
    });
  }

  ionViewWillEnter(){
    let fdContract=this.navParams.get("fdContract");
    this.contract=new Contract(fdContract);
    var now=moment().format("YYYY-MM-DD");
    this.canEdit=this.contract.fdCreateTime==now&&this.contract.fdCreatorId==this.userService.getUserId();
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
    this.nav.push(ContractEditPage,{fdContract:this.contract});
  }
}

