import {Component} from "@angular/core";
import {Contract} from "../../_models/contract";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl:"contract-view.component.html",
  selector:"page-contract-view"
})
export class ContractViewPage{
  //合同
  private contract:Contract;
  constructor(private navParams:NavParams){
    this.contract=new Contract();
  }

  ionViewWillEnter(){
    let fdContract=this.navParams.get("fdContract");
    this.contract=new Contract(fdContract);
  }
}

