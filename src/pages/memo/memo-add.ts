import {MemoService} from "../../_services/memo.service";
import {NavController, NavParams, ModalController, Events} from "ionic-angular";
import {Memo} from "../../_models/Memo";
import {MemoItem} from "../../_models/MemoItem";
import {MemoItemPage} from "./modal/memo-item";
import {Component, Input} from "@angular/core";
import * as moment from "moment";

@Component({
  templateUrl:"memo-add.html",
  selector:"page-memo-add"
})
export  class MemoAddPage{
  private memo:Memo;
  //总结的标题
  private fdSummaryTitle:string;
  //计划的标题
  private fdPlanTitle:string;
  //标题
  private fdTitle:string='新日志';
  //计划的标题
  private fdOrigin:string;
  constructor(private nav:NavController,private navParams:NavParams,private  event:Events,private modal:ModalController,private memoService:MemoService){
    this.reset();
  }
  reset(){
    this.memo=new Memo();
    this.memo.fdType="日报";
    this.memo.fdStartDate=moment().format("YYYY-MM-DD");
    this.memo.fdEndDate=moment().format("YYYY-MM-DD");
    this.fdSummaryTitle="今日工作总结";
    this.fdPlanTitle="明日工作计划";
  }
  ionViewWillEnter(){
    this.fdOrigin=this.navParams.get("fdOrigin");
    switch(this.fdOrigin){
      case "memo":
        let m=this.navParams.get("memo");
        this.memo=m||this.memo;
        this.fdTitle="编辑日志";
        break;
    }
  }
  fdType_Changed(){
    console.log(this.memo.fdEndDate);
    switch (this.memo.fdType){
      case "日报":
        this.memo.fdStartDate=moment().format("YYYY-MM-DD");
        this.memo.fdEndDate=moment().format("YYYY-MM-DD");
        this.fdSummaryTitle="今日工作总结";
        this.fdPlanTitle="明日工作计划";
        break;
      case "周报":
        this.memo.fdStartDate=moment().day(1).format("YYYY-MM-DD");
        this.memo.fdEndDate=moment().day(7).format("YYYY-MM-DD");
        this.fdSummaryTitle="本周工作总结";
        this.fdPlanTitle="下周工作计划";
        break;
      case "月报":
        this.memo.fdStartDate=moment().date(1).format("YYYY-MM-DD");
        this.memo.fdEndDate=moment().add(1,'months').date(0).format("YYYY-MM-DD");
        this.fdSummaryTitle="本月工作总结";
        this.fdPlanTitle="下月工作计划";
        break;
      default:
        break;
    }
  }
  save(){

  }
  createSummaryMemo(){
    this.editSummaryMemo(new MemoItem(),'新增工作总结');
  }
  editSummaryMemo(p:MemoItem,title?:string){
    let memoItemModal=this.modal.create(MemoItemPage,{memoItem:p,fdTitle:title||'编辑工作总结'});
    memoItemModal.onDidDismiss(data=>{
      switch (data.result){
        case "save":
          let hasExists=false;
          let memoItem=data.memoItem;
          this.memo.fdSummaryMemo.forEach((item,index)=>{
            if(item.id==memoItem.id){
              hasExists=true;
              this.memo.fdSummaryMemo.splice(index,1,new MemoItem(memoItem));
              return false;
            }
          });
          if(!hasExists){
            this.memo.fdSummaryMemo.push(new MemoItem(memoItem));
          }
          break;
        case "back":
          break;
        case "delete":
          this.memo.fdSummaryMemo.forEach((item,index)=>{
            if(item.id==data.memoItem.id){
              this.memo.fdSummaryMemo.splice(index,1);
              return false;
            }
          });
          break;
      }
    });
    memoItemModal.present();
  }
  createPlanMemo(){
    this.editPlanMemo(new MemoItem(),'新增工作计划');
  }
  editPlanMemo(p:MemoItem,title?:string){
    let memoItemModal=this.modal.create(MemoItemPage,{memoItem:p,fdTitle:title||'编辑工作计划'});
    memoItemModal.onDidDismiss(data=>{

      switch (data.result){
        case "save":
          let hasExists=false;
          let memoItem=data.memoItem;
          this.memo.fdPlanMemo.forEach((item,index)=>{
            if(item.id==memoItem.id){
              hasExists=true;
              this.memo.fdPlanMemo.splice(index,1,new MemoItem(memoItem));
              return false;
            }
          });
          if(!hasExists){
            this.memo.fdPlanMemo.push(new MemoItem(memoItem));
          }
          break;
        case "back":
          break;
        case "delete":
          this.memo.fdPlanMemo.forEach((item,index)=>{
            if(item.id==data.memoItem.id){
              this.memo.fdPlanMemo.splice(index,1);
              return false;
            }
          });
          break;
      }
    });
    memoItemModal.present();
  }
}
