import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, Events, NavParams, InfiniteScroll, Toast, ToastController} from "ionic-angular";
import {CustomerAddPage} from "./customer-add.component";
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
import {UserService} from "../../_services/user.service";
import {ContractEditPage} from "../contract/contract-edit.component";

@Component({
  templateUrl:"customer.html",
  selector:"page-customer"
})
export  class CustomerPage{
  //是否单点时可以选中
  private canSelected:boolean=false;
  //事件的来源
  private fdOrigin:string;
  //搜索的内容
  private fdCriterial:{fdDesc:string,fdOrder:string,fdName:string,fdSalerName:string,fdStartDate:string,fdEndDate:string};
  //选定的Customer的ID
  private selectCustomer:Customer;
  //客户列表
  private customers:Array<Customer>=[];
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  //服务器端是否还有更多数据
  private isAdmin:boolean=true;
  private isShowSearch:boolean=false;
  private toast:Toast;
  constructor(private toastCtrl:ToastController,private nav:NavController,private navParams:NavParams,private  event:Events,private callNumber: CallNumber,private customerService:CustomerService,private userService:UserService){
    this.isAdmin=this.userService.getRole()==="ROLE_ADMIN";
    this.fdCriterial={fdDesc:"客户",fdOrder:"+",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
  }


  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    this.canSelected=false;
    this.indexPage=0;
    this.customers=[];
    switch(this.fdOrigin){
      case "contract-edit"://编辑合同选则客户时
      case "contract"://新建合同选则客户时
        this.canSelected=true;
        break;
      case "followup"://新建回访选则客户时
        this.canSelected=true;
        break;
      case "followup-query"://新建回访选则客户时
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
  search(){
    this.isShowSearch=false;
    this.indexPage=0;
    this.customers=[];
    this.buildDesc();
    this.loadData().subscribe();
  }
  resetSearch(){
    this.isShowSearch=false;
    this.resetQuery();
    this.search();
  }
  loadData():Observable<any>{
    return this.customerService.findAll(this.fdCriterial.fdStartDate,this.fdCriterial.fdEndDate,this.fdCriterial.fdSalerName,this.fdCriterial.fdName,this.fdCriterial.fdOrder,this.indexPage).pipe(
      tap(data=>{
      let newCustomers=data.content.map(item=>{
        return new Customer(item);
      });
      this.customers=this.customers.concat(newCustomers);
      this.indexPage++;
      this.hasMoreRecords=data.totalPages>this.indexPage;
    }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }
  ionViewWillLeave() {
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    switch (this.fdOrigin){
      case "contract-edit"://新建合同选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(ContractEditPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "contract"://新建合同选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(ContractAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "followup"://新建回访选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(FollowupAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "followup-query"://新建回访选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(FollowupPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "redletterDay"://新建纪念日选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(RedletterDayAddPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      default:
        break;

    }
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
      this.fdCriterial.fdDesc="客户";
    }
  }

  resetQuery(){
    this.fdCriterial={fdDesc:"客户",fdOrder:"+",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
    this.search();
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
