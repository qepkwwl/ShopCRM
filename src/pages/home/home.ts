import {Component, ViewChild} from "@angular/core";
import {NavController} from "ionic-angular";
import {Chart} from "chart.js";
import {transition, animate, state, trigger, style} from "@angular/animations";
import {Followup} from "../../_models/followup";
import {Customer} from "../../_models/customer";
import {RedletterDay} from "../../_models/redletter-day";
import {RedletterDayService} from "../../_services/redletter-day.service";
import {FollowupService} from "../../_services/followup.service";
import {FollowupPage} from "../followup/followup";
import {RedletterDayAddPage} from "../redletter-day/redletter-add";
import {RedletterDayPage} from "../redletter-day/redletter";

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
  private fdRedletterDaies:Array<RedletterDay>;
  private fdFollowups:Array<Followup>;
  private fdPlans:Array<string>;
  private fdTasks:Array<string>;
  private dayIndexWithShowed=true;
  private barChart:any;
  constructor(public nav: NavController,private redletterDaySerivce:RedletterDayService,private followupService:FollowupService) {
    this.fdRedletterDaies=[];
    this.fdFollowups=[];
    this.fdPlans=["继续回访客户","沈建3月用酒回款沟通","农行送发票"];
    this.fdTasks=["月度销售任务:100000,还差42000","年度任务：1000000，还差420000"];
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
  ionViewDidLoad() {
    this.redletterDaySerivce.findRedletterDay().then(res=>{
      this.fdRedletterDaies=res;
    });
    this.followupService.findFollowup().then(res=>{
      this.fdFollowups=res;
    });
  }
  goToFollowup(){
    this.nav.push(FollowupPage);
  }
  goToRedletterDay(){
    this.nav.push(RedletterDayPage);
  }
}
