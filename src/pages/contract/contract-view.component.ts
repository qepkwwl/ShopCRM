import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {ContractProduct} from "../../_models/contractProduct";
import {
  NavController, ModalController, Events, NavParams, Toast, Loading, LoadingController,
  ToastController
} from "ionic-angular";
import {ProductPage} from "../product/product";
import {CustomerPage} from "../customer/customer";
import {ContractCustomer} from "../../_models/contractCustomer";
import {Customer} from "../../_models/customer";
import {Product} from "../../_models/product";
import {ContractProductPage} from "./modal/contract-product";
import {ContractService} from "../../_services/contract.service";

@Component({
  templateUrl:"contract-view.component.html",
  selector:"page-contract-view"
})
export class ContractViewPage{
  //合同
  private contract:Contract;
  constructor(private nav:NavController,private navParams:NavParams){
    this.contract=new Contract();
  }

  ionViewWillEnter(){
    let fdContract=this.navParams.get("fdContract");
    this.contract=new Contract(fdContract);
  }
}

