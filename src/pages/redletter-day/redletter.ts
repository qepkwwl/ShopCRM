import {Component, Input} from "@angular/core";
import {NavParams, NavController, InfiniteScroll} from "ionic-angular";
import {Customer} from "../../_models/customer";
import {RedletterDayService} from "../../_services/redletter-day.service";
import {RedletterDay} from "../../_models/redletter-day";
import {RedletterDayAddPage} from "./redletter-add";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
@Component({
  templateUrl:"redletter.html",
  selector:"page-redletter"
})
export class RedletterDayPage{
 private redletterDaies:Array<RedletterDay>=[];
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
  constructor(private nav:NavController,private navParams:NavParams,private redletterDayService:RedletterDayService){
    this.redletterDaies=[];
  }
  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    this.indexPage=0;
    this.redletterDaies=[];
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
    this.redletterDaies=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.redletterDayService.findAll(this.fdCurrentCustomerId,this.fdSearchValue,this.indexPage).pipe(
      tap(data=>{
        let newRecords=data.content.map(item=>{
          return new RedletterDay(item);
        });
        this.redletterDaies=this.redletterDaies.concat(newRecords);
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
    this.nav.push(RedletterDayAddPage);
  }
}
