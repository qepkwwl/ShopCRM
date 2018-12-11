

import {BasePage} from "../../base/BasePage";
import {Component} from "@angular/core";
import {NavParams, ViewController} from "ionic-angular";

@Component({
  templateUrl:"contract-search.html",
  selector:"page-contract-search"
})
export class ContractSearchPage{
  //搜索的内容
  private fdCriterial:{fdDesc:string,fdOrder:string,fdName:string,fdSalerName:string,fdStartDate:string,fdEndDate:string};

  constructor(private view: ViewController,private navParams:NavParams) {
    this.fdCriterial={fdDesc:"合同",fdOrder:"-",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
  }
  resetQuery(){
    this.fdCriterial={fdDesc:"合同",fdOrder:"-",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
    this.view.dismiss({fdCriterial:this.fdCriterial,result:"search"});
  }
  search(){
    this.fdCriterial.fdDesc="";
    if(!/^\s*$/.test(this.fdCriterial.fdName)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdName+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdSalerName)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdSalerName+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdStartDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdStartDate+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdEndDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdEndDate+" ";
    }
    if(/^\s*$/.test(this.fdCriterial.fdDesc)){
      this.fdCriterial.fdDesc="合同";
    }
    this.view.dismiss({fdCriterial:this.fdCriterial,result:"search"});
  }
  back() {
    this.view.dismiss({result:"back"});
  }
}
