import {Component, ViewChild} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {Chart} from "chart.js";
import {transition, animate, state, trigger, style} from "@angular/animations";
import {Followup} from "../../_models/followup";
import {Customer} from "../../_models/customer";
import {RedletterDay} from "../../_models/redletter-day";
import {RedletterDayService} from "../../_services/redletter-day.service";
import {FollowupService} from "../../_services/followup.service";
import {FollowupPage} from "../followup/followup";
import {RedletterDayPage} from "../redletter-day/redletter";
import {UserService} from "../../_services/user.service";
import {Achieve} from "../../_models/achieve";
import {MemoItem} from "../../_models/MemoItem";
import {tap} from "rxjs/operators";
import {MemoService} from "../../_services/memo.service";
import {SystemSettingPage} from "../system/setting";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [trigger(
    'openClose',
    [
      state('true', style({transform:'translateY(0rem)'})),
      state('false', style({transform:'translateY(-4.4rem)'})),
      transition('true => false', [animate("2s 0ms linear")]),
      transition('false => true', [])
    ])]
})
export class HomePage {
  private achieve:Achieve=new Achieve();
  private fdRedletterDaies:Array<RedletterDay>=[];
  private fdFollowups:Array<Followup>=[];
  private fdPlans:Array<MemoItem>=[];
  private dayIndexWithShowed=true;
  constructor(public nav: NavController,private redletterDaySerivce:RedletterDayService,private followupService:FollowupService,private modal :ModalController,private memoService:MemoService,private userService:UserService) {
    setInterval(this.animationRedletterDaies,2000);
  }
  animationRedletterDaies= ()=> {
    if(!this.dayIndexWithShowed){
      if(this.fdRedletterDaies.length>0){
        let first=this.fdRedletterDaies[0];
        this.fdRedletterDaies.splice(0,1);
        this.fdRedletterDaies.push(first);
      }
      if(this.fdFollowups.length>0){
        let first=this.fdFollowups[0];
        this.fdFollowups.splice(0,1);
        this.fdFollowups.push(first);
      }
    }
    this.dayIndexWithShowed=!this.dayIndexWithShowed;
  }
  ionViewWillEnter() {
    this.redletterDaySerivce.findAll(0,"",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new RedletterDay(item);
        });
        this.fdRedletterDaies=this.fdRedletterDaies.concat(records);
      })).subscribe();
    this.followupService.findAll("","",0,"","+",0).pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          let followup=new Followup();
          followup.fdCustomerId=item.fdCustomerId;
          followup.fdCustomerName=item.fdCustomerName;
          followup.fdDate=/(\d{2}:\d{2}):\d{2}$/ig.exec(item.fdTime)[1];
          followup.fdTime=/^(\d{4}-\d{2}-\d{2})/ig.exec(item.fdTime)[1];
          followup.fdContent=item.fdContent;
          followup.fdGift=item.fdGift;
          return followup;
        });
        this.fdFollowups=this.fdFollowups.concat(records);
      })).subscribe();
    this.userService.findAchieve().pipe(
      tap(data=>{
      Object.assign(this.achieve,data);
    })).subscribe();
    this.memoService.findAll("",0).pipe(
      tap(data=>{
        if(data.content.length>0){
          let records=data.content[0].fdPlanMemoes.map(item=>{
            return new MemoItem(item);
          });
          this.fdPlans=this.fdPlans.concat(records);
        }
      })).subscribe();
  }
  goToFollowup(){
    this.nav.push(FollowupPage);
  }
  goToRedletterDay(){
    this.nav.push(RedletterDayPage);
  }
  gotoSetting(){
    this.nav.push(SystemSettingPage);
  }
}
