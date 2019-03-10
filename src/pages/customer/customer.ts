import {Component} from "@angular/core";
import {Customer} from "../../_models/customer";
import {NavController, Events, NavParams, InfiniteScroll, Toast, ToastController, ModalController} from "ionic-angular";
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
import {BasePage} from "../base/BasePage";
import {FollowupEditPage} from "../followup/followup-edit";
import {FollowupSearchPage} from "../followup/modal/followup-search";
import {CustomerSearchPage} from "./modal/customer-search";

@Component({
  templateUrl:"customer.html",
  selector:"page-customer"
})
export  class CustomerPage extends  BasePage{
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
  //总页码
  private totalPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  private toast:Toast;
  constructor(private toastCtrl:ToastController,private modal:ModalController,private nav:NavController,private navParams:NavParams,private  event:Events,private callNumber: CallNumber,private customerService:CustomerService, userService:UserService){
    super(userService);
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
      case "followup-edit"://新建回访选则客户时
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

    let searchModal=this.modal.create(CustomerSearchPage,{fdCriterial:this.fdCriterial});
    searchModal.onDidDismiss(data=>{
      switch (data.result){
        case "search":
          this.fdCriterial=data.fdCriterial;
          this.indexPage=0;
          this.customers=[];
          this.loadData().subscribe();
          break;
        case "back":
          break;
      }
    });
    searchModal.present();
  }
  loadData():Observable<any>{
    return this.customerService.findAll(this.fdCriterial.fdStartDate,this.fdCriterial.fdEndDate,this.fdCriterial.fdSalerName,this.fdCriterial.fdName,this.fdCriterial.fdOrder,this.indexPage).pipe(
      tap(data=>{
      let newCustomers=data.content.map(item=>{
        return new Customer(item);
      });
      this.customers=this.customers.concat(newCustomers);
      this.totalPage=data.totalPages;
      if(this.indexPage<this.totalPage){
        this.indexPage++;
      }
      this.hasMoreRecords=data.totalPages>this.indexPage;
    }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.toast=this.toastCtrl.create({
      message:this.indexPage+"/"+this.totalPage,
      duration:1000,
      position:'middle'
    });
    this.toast.present();
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
      case "followup-edit"://新建回访选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(FollowupEditPage.SELECTED_CUSTOMER,this.selectCustomer);
        break;
      case "followup-query"://新建回访选则客户时
        if(this.selectCustomer==null){
          this.toast.setMessage("未选定客户");
          this.toast.present();
          return ;
        }
        this.event.publish(FollowupSearchPage.SELECTED_CUSTOMER,this.selectCustomer);
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
  resetQuery(){
    this.fdCriterial={fdDesc:"客户",fdOrder:"+",fdName:"",fdSalerName:'',fdStartDate:"",fdEndDate:""};
    this.indexPage=0;
    this.customers=[];
    this.loadData().subscribe();
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
