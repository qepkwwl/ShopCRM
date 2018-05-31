import {Component} from "@angular/core";
import {NavController, NavParams, InfiniteScroll} from "ionic-angular";
import {ContractAddPage} from "./contract-add.component";
import {Contract} from "../../_models/contract";
import {ContractService} from "../../_services/contract.service";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {ContractViewPage} from "./contract-view.component";

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
  private fdSearchValue:string='';
  //对应客户的ID
  private fdCurrentCustomerId:number=0;
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  constructor(private nav:NavController,private navParams:NavParams,private contractService:ContractService){
    this.reset();
  }
  reset(){
    this.contracts=[];
  }
  search(ev: any){
    this.fdSearchValue=ev.target.value;
    this.indexPage=0;
    this.contracts=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.contractService.findAll(this.fdCurrentCustomerId,this.fdSearchValue,this.indexPage).pipe(
      tap(data=>{
        let records=data.content.map(item=>new Contract(item));
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
