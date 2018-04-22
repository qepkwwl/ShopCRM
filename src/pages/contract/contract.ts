import {Component, Input} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
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
  @Input() fdCustomer: Customer;
  constructor(private nav:NavController,private navParams:NavParams,private contractService:ContractService){
    this.reset();
    console.log(this.fdCustomer);
  }
  reset(){
    this.contracts=[];
  }
  buildProductText(fdProducts:Array<ContractProduct>){
    return fdProducts.map((item,index)=>{
      return item.fdName+":"+item.fdNum+"件"+item.fdSubtotal+"元"
    }).join(";");
  }


  ionViewWillEnter(){
    console.log(this.fdCustomer);
    let fdOrigin=this.navParams.get("fdOrigin");
    switch(fdOrigin){
      case "customer":
        this.contractService.findContractByCustomer().then(res=>{
          this.contracts=res;
        });
        break;
      default:
        this.contractService.findContract().then(res=>{
          this.contracts=res;
        });
        break;
    }
  }

  add(){
    this.nav.push(ContractAddPage);
  }
}