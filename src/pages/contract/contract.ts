import {Component, Input} from "@angular/core";
import {NavController, NavParams, Refresher} from "ionic-angular";
import {ContractAddPage} from "./contract-add.component";
import {Contract} from "../../_models/contract";
import {ContractProduct} from "../../_models/contractProduct";
import {ContractService} from "../../_services/contract.service";
import {Customer} from "../../_models/customer";

@Component({
  templateUrl:"contract.html",
  selector:"page-contract"
})
export  class ContractPage{
  //是否显示搜索框
  private isShowSearch:boolean=false;
  //客户列表
  private contracts:Array<Contract>;
  private fdOrigin:string;
  constructor(private nav:NavController,private navParams:NavParams,private contractService:ContractService){
    this.reset();
  }
  reset(){
    this.contracts=[];
  }
  doRefresh(refresher:Refresher){
    this.contractService.findContract().subscribe({next:res=>{
      //this.contracts=res;
      refresher.complete();
    }});
  }
  ionViewDidLoad(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "customer":
        this.contractService.findContractByCustomer().subscribe({next:res=>{
        //this.contracts=res;
      }});
        break;
      default:
      this.contractService.findContractByCustomer().subscribe({next:res=>{
        //this.contracts=res;
      }});
        break;
    }
  }

  add(){
    this.nav.push(ContractAddPage);
  }
}
