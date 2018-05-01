import {Component, Input} from "@angular/core";
import {FollowupService} from "../../_services/followup.service";
import {Followup} from "../../_models/followup";
import {NavParams, NavController, InfiniteScroll} from "ionic-angular";
import {Customer} from "../../_models/customer";
import {FollowupAddPage} from "./followup-add";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
@Component({
  templateUrl:"followup.html",
  selector:"page-followup"
})
export class FollowupPage{
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

  constructor(private nav:NavController,private navParams:NavParams,private followupService:FollowupService){
    this.followups=[];
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

  search(ev: any){
    this.fdSearchValue=ev.target.value;
    this.indexPage=0;
    this.followups=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.followupService.findAll(this.fdCurrentCustomerId,this.fdSearchValue,this.indexPage).pipe(
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
}
