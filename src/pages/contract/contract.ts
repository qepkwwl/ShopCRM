import {Component} from "@angular/core";
import {NavController, NavParams, InfiniteScroll} from "ionic-angular";
import {ContractAddPage} from "./contract-add.component";
import {Contract} from "../../_models/contract";
import {ContractService} from "../../_services/contract.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ContractViewPage} from "./contract-view.component";
import {UserService} from "../../_services/user.service";

@Component({
  templateUrl:"contract.html",
  selector:"page-contract"
})
export  class ContractPage{
  //客户列表
  private contracts:Array<Contract>;
  //事件的来源
  private fdOrigin:string;
  //搜索的内容
  private fdCriterial:{fdDesc:string,fdOrder:string,fdName:string,fdSalerName:string,fdStartDate:string,fdEndDate:string};
  //对应客户的ID
  private fdCurrentCustomerId:number=0;
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  private isAdmin:boolean=true;
  private isShowSearch:boolean=false;
  constructor(private nav:NavController,private navParams:NavParams,private contractService:ContractService,private userService:UserService){
    this.reset();
    this.isAdmin=this.userService.getRole()==="ROLE_ADMIN";
    this.fdCriterial={fdDesc:"合同",fdOrder:"+",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
  }
  reset(){
    this.contracts=[];
  }
  search(){
    this.isShowSearch=false;
    this.indexPage=0;
    this.contracts=[];
    this.buildDesc();
    this.loadData().subscribe();
  }
  resetSearch(){
    this.isShowSearch=false;
    this.resetQuery();
    this.search();
  }
  loadData():Observable<any>{
    return this.contractService.findAll(this.fdCurrentCustomerId,this.fdCriterial.fdStartDate,this.fdCriterial.fdEndDate,this.fdCriterial.fdSalerName,this.fdCriterial.fdName,this.fdCriterial.fdOrder,this.indexPage).pipe(
    tap(data=>{
        let records=data.content.map(item=>{
          var c=new Contract(item);
          if(c.fdTotal<0){
            c.fdIsSale="false";
          }else{
            c.fdIsSale="true";
          }
          return c;
        });
        this.contracts=this.contracts.concat(records);
        this.indexPage++;
        this.hasMoreRecords=data.totalPages>this.indexPage;
      }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }
  ionViewWillEnter(){
    this.indexPage=0;
    this.contracts=[];
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "customer"://针对客户 点击历史合同时
        let fdCustomer=this.navParams.get("fdCustomer");
        this.fdCurrentCustomerId=fdCustomer.id;
        break;
      default:
        this.fdCurrentCustomerId=0;
        break;
    }
    this.loadData().subscribe();
  }

  //拼接出查询条件的字符串
  buildDesc(){
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
  }

  resetQuery(){
    this.fdCriterial={fdDesc:"合同",fdOrder:"+",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
    this.search();
  }
  add(){
    this.nav.push(ContractAddPage);
  }
  view(c:Contract){
    this.nav.push(ContractViewPage,{fdContract:c});
  }
}
