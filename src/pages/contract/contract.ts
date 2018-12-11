import {Component} from "@angular/core";
import {NavController, NavParams, InfiniteScroll, ModalController} from "ionic-angular";
import {ContractAddPage} from "./contract-add.component";
import {Contract} from "../../_models/contract";
import {ContractService} from "../../_services/contract.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ContractViewPage} from "./contract-view.component";
import {UserService} from "../../_services/user.service";
import {BasePage} from "../base/BasePage";
import {ContractSearchPage} from "./modal/contract-search";

@Component({
  templateUrl:"contract.html",
  selector:"page-contract"
})
export  class ContractPage extends  BasePage{
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

  constructor(private nav:NavController,private modal :ModalController,private navParams:NavParams,private contractService:ContractService,userService:UserService){
    super(userService);
    this.reset();
    this.fdCriterial={fdDesc:"合同",fdOrder:"-",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
  }
  reset(){
    this.contracts=[];
  }
  resetQuery(){
    this.fdCriterial={fdDesc:"合同",fdOrder:"-",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
    this.indexPage=0;
    this.contracts=[];
    this.loadData().subscribe();
  }
  search(){
    let searchModal=this.modal.create(ContractSearchPage,{fdCriterial:this.fdCriterial});
    searchModal.onDidDismiss(data=>{
      switch (data.result){
        case "search":
          this.fdCriterial=data.fdCriterial;
          this.indexPage=0;
          this.contracts=[];
          this.loadData().subscribe();
          break;
        case "back":
          break;
      }
    });
    searchModal.present();
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
  add(){
    this.nav.push(ContractAddPage);
  }
  view(c:Contract){
    this.nav.push(ContractViewPage,{fdContract:c});
  }
}
