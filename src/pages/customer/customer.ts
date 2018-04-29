import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, Events, NavParams, Refresher, InfiniteScroll} from "ionic-angular";
import {CustomerAddPage} from "./customer-add.component";
import {LoginPage} from "../login/login";
import {ContractAddPage} from "../contract/contract-add.component";
import {FollowupAddPage} from "../followup/followup-add";
import {FollowupPage} from "../followup/followup";
import {ContractPage} from "../contract/contract";
import {CustomerService} from "../../_services/customer.service";
import {CustomerViewPage} from "./customer-view";
import {CallNumber} from "@ionic-native/call-number";
import {RedletterDayAddPage} from "../redletter-day/redletter-add";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  templateUrl:"customer.html",
  selector:"page-customer"
})
export  class CustomerPage{
  //是否显示搜索框
  private isShowSearch:boolean=false;
  //是否单点时可以选中
  private canSelected:boolean=false;
  //事件的来源
  private fdOrigin:string;
  //搜索的内容
  private fdSearchValue:string='';
  //选定的Customer的ID
  private selectCustomer:Customer;
  //客户列表
  private customers:Array<Customer>=[];
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreProduct:boolean=true;
  constructor(private nav:NavController,private navParams:NavParams,private  event:Events,private callNumber: CallNumber,private customerService:CustomerService){
  }


  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    this.canSelected=false;
    switch(this.fdOrigin){
      case "contract"://新建合同选则客户时
        this.canSelected=true;
        break;
      case "followup"://新建回访选则客户时
        this.canSelected=true;
        break;
      case "redletterDay"://新建纪念日选则客户时
        this.canSelected=true;
        break;
      default:
        break;
    }
    this.loadData().subscribe();
  }
  selected(c){
    if(this.canSelected){
      this.selectCustomer=c;
    }else{
      this.nav.push(CustomerViewPage,{customer:c});
    }
  }
  search(ev: any){
    this.fdSearchValue=ev.target.value;
    this.indexPage=0;
    this.customers=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.customerService.findAll(this.fdSearchValue,this.indexPage).pipe(
      tap(data=>{
      let newCustomers=data.content.map(item=>{
        return new Customer(item);
      });
      this.customers=this.customers.concat(newCustomers);
      this.hasMoreProduct=data.totalPages-1>this.indexPage++;
    }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }
  ionViewWillLeave() {
    switch (this.fdOrigin){
      case "contract"://新建合同选则客户时
        this.event.publish(ContractAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "followup"://新建回访选则客户时
        this.event.publish(FollowupAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "redletterDay"://新建纪念日选则客户时
        this.event.publish(RedletterDayAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      default:
        break;

    }
  }
  newContract(c:Customer){
    this.nav.push(ContractAddPage,{fdCustomer:c,fdOrigin:'customer'});
  }
  hisContract(c:Customer){
    this.nav.push(ContractPage,{fdCustomer:c,fdOrigin:'customer'});
  }
  newFollowup(c:Customer){
    this.nav.push(FollowupAddPage,{fdCustomer:c,fdOrigin:'customer'});
  }
  hisFollowup(c:Customer){
    this.nav.push(FollowupPage,{fdCustomer:c,fdOrigin:'customer'});
  }
  add(){
    this.nav.push(CustomerAddPage);
  }
  callCustomer(p:Customer){
    this.callNumber.callNumber(p.fdStationPhone||p.fdLinkPhone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
}
