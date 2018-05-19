import {Component, Input, ViewChild} from "@angular/core";
import {FollowupService} from "../../_services/followup.service";
import {Followup} from "../../_models/followup";
import {NavParams, NavController, InfiniteScroll, MenuController, Menu, Events} from "ionic-angular";
import {Customer} from "../../_models/customer";
import {FollowupAddPage} from "./followup-add";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {CustomerPage} from "../customer/customer";
@Component({
  templateUrl:"followup.html",
  selector:"page-followup"
})
export class FollowupPage{
  //是否显示搜索框
  private isShowSearch:boolean=false;

 private followups:Array<Followup>=[];
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

  public static SELECTED_CUSTOMER:string="FollowupQuery.select.customer.completed";

  private fdCriterial:{fdDesc:string,fdOrder:string,fdName:string,fdCustomerId:number,fdCustomerName:string,fdStartDate:string,fdEndDate:string}
  constructor(private nav:NavController,private event:Events,private navParams:NavParams,private followupService:FollowupService){
    this.followups=[];
    this.fdCriterial={fdDesc:"拜访记录",fdOrder:"+",fdName:"",fdCustomerId:0,fdCustomerName:'指定客户',fdStartDate:"",fdEndDate:""};
    this.event.subscribe(FollowupPage.SELECTED_CUSTOMER,this.afterSelectedCustomer);
  }
  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    this.indexPage=0;
    this.followups=[];
    switch(this.fdOrigin){
      case "customer":
        let fdCustomer=this.navParams.get("fdCustomer");
        this.fdCurrentCustomerId=fdCustomer.id;
        break;
      default:
        break;
    }
    this.loadData().subscribe();
  }

  search(){
    this.isShowSearch=false;
    this.indexPage=0;
    this.followups=[];
    this.buildDesc();
    this.loadData().subscribe();
  }
  //拼接出查询条件的字符串
  buildDesc(){
    this.fdCriterial.fdDesc="";
    if(!/^\s*$/.test(this.fdCriterial.fdName)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdName+" ";
    }
    if(this.fdCriterial.fdCustomerId>0){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdCustomerName+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdStartDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdStartDate+" ";
    }
    if(!/^\s*$/.test(this.fdCriterial.fdEndDate)){
      this.fdCriterial.fdDesc+=this.fdCriterial.fdEndDate+" ";
    }
    if(/^\s*$/.test(this.fdCriterial.fdDesc)){
      this.fdCriterial.fdDesc="拜访记录";
    }
  }
  loadData():Observable<any>{
    return this.followupService.findAll(this.fdCriterial.fdStartDate,this.fdCriterial.fdEndDate,this.fdCriterial.fdCustomerId,this.fdCriterial.fdName,this.fdCriterial.fdOrder,this.indexPage).pipe(
      tap(data=>{
        let newRecords=data.content.map(item=>{
          let followup=new Followup();
          followup.fdCustomerId=item.fdCustomerId;
          followup.fdCustomerName=item.fdCustomerName;
          followup.fdDate=/(\d{2}:\d{2}):\d{2}$/ig.exec(item.fdTime)[1];
          followup.fdTime=/^(\d{4}-\d{2}-\d{2})/ig.exec(item.fdTime)[1];
          followup.fdContent=item.fdContent;
          followup.fdGift=item.fdGift;
          return followup;
        });
        this.followups=this.followups.concat(newRecords);
        this.indexPage++;
        this.hasMoreRecords=data.totalPages>this.indexPage;
      }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }
  add(){
    this.nav.push(FollowupAddPage);
  }

  resetQuery(){
    this.fdCriterial={fdDesc:"拜访记录",fdOrder:"+",fdName:"",fdCustomerId:0,fdCustomerName:'指定客户',fdStartDate:"",fdEndDate:""};
    this.search();
  }
  private afterSelectedCustomer=(c:Customer)=>{
    if(c){
      this.fdCriterial.fdCustomerId=c.id;
      this.fdCriterial.fdCustomerName=c.fdName;
    }
  }
  selectCustomer(){
    this.nav.push(CustomerPage,{fdOrigin:'followup-query',fdCustomerId:this.fdCriterial.fdCustomerId});
  }
}
