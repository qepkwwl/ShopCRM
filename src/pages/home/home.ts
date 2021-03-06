import {Component} from "@angular/core";
import {NavController, ModalController} from "ionic-angular";
import {transition, animate, state, trigger, style} from "@angular/animations";
import {FollowupPage} from "../followup/followup";
import {RedletterDayPage} from "../redletter-day/redletter";
import {UserService} from "../../_services/user.service";
import {Achieve} from "../../_models/achieve";
import {MemoItem} from "../../_models/MemoItem";
import {tap} from "rxjs/operators";
import {MemoService} from "../../_services/memo.service";
import {SystemSettingPage} from "../system/setting";
import {TodoService} from "../../_services/todo.service";
import {Todo} from "../../_models/todo";
import {ContractArchivePage} from "./modal/contract-archive";
import * as moment from "moment";

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
  private fdKeyDayTodoes:Array<Todo>=[];
  private fdFollowupTodoes:Array<Todo>=[];
  private fdPlans:Array<MemoItem>=[];
  private dayIndexWithShowed=true;
  areaName:string;
  constructor(public nav: NavController,private modal :ModalController,private todoService:TodoService,private memoService:MemoService,private userService:UserService) {
    setInterval(this.animationRedletterDaies,2000);
  }
  animationRedletterDaies= ()=> {
    if(!this.dayIndexWithShowed){
      if(this.fdKeyDayTodoes.length>0){
        let first=this.fdKeyDayTodoes[0];
        this.fdKeyDayTodoes.splice(0,1);
        this.fdKeyDayTodoes.push(first);
      }
      if(this.fdFollowupTodoes.length>0){
        let first=this.fdFollowupTodoes[0];
        this.fdFollowupTodoes.splice(0,1);
        this.fdFollowupTodoes.push(first);
      }
    }
    this.dayIndexWithShowed=!this.dayIndexWithShowed;
  }
  ionViewWillEnter() {
    this.fdKeyDayTodoes=[];
    this.fdFollowupTodoes=[];
    this.fdPlans=[];
    this.areaName=this.userService.getArea();
    this.todoService.findAll("TODO_KEYDAY_NOTIFY").pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Todo(item);
        });
        this.fdKeyDayTodoes=this.fdKeyDayTodoes.concat(records);
      })).subscribe();
    this.todoService.findAll("TODO_FOLLOWUP_NOTIFY").pipe(
      tap(data=>{
        let records=data.content.map(item=>{
          return new Todo(item);
        });
        this.fdFollowupTodoes=this.fdFollowupTodoes.concat(records);
      })).subscribe();
    this.userService.findAchieve().pipe(
      tap(data=>{
        Object.assign(this.achieve,data);
        this.achieve.fdMonthCompleted=parseFloat((this.achieve.fdMonthCompleted/10000).toFixed(2));
        this.achieve.fdMonthAchieved=parseFloat((this.achieve.fdMonthAchieved/10000).toFixed(2));
        this.achieve.fdYearCompleted=parseFloat((this.achieve.fdYearCompleted/10000).toFixed(2));
        this.achieve.fdYearAchieved=parseFloat((this.achieve.fdYearAchieved/10000).toFixed(2));
    })).subscribe();
    this.memoService.findAll("",0).pipe(
      tap(data=>{
        if(data.content.length>0){
          let records=data.content[0].fdPlanMemoes.map(item=>{
            item.fdContent=item.fdContent.replace(/\n/g,"<br />");
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
  showMonthAchieve(){

    let achiveModal=this.modal.create(ContractArchivePage,{fdCriterial:{fdDesc:"月度计划",fdStartDate:moment().date(1).format("YYYY-MM-DD"),fdEndDate:moment().add(1,'months').date(0).format("YYYY-MM-DD")}});
    achiveModal.present();
  }
  showYearAchieve(){
    let achiveModal=this.modal.create(ContractArchivePage,{fdCriterial:{fdDesc:"年度计划",fdStartDate:moment().startOf('year').format('YYYY-MM-DD'),fdEndDate:moment().add(1,'months').date(0).format('YYYY-MM-DD')}});
    achiveModal.present();
  }
}
