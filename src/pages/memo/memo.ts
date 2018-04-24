import {Component} from "@angular/core";
import {NavController, NavParams, Events} from "ionic-angular";
import {MemoService} from "../../_services/memo.service";
import {Memo} from "../../_models/Memo";
import {MemoAddPage} from "./memo-add";
@Component({
  templateUrl:"memo.html",
  selector:"page-memo"
})
export  class MemoPage{
  private memoes:Array<Memo>;
  constructor(private nav:NavController,private navParams:NavParams,private  event:Events,private memoService:MemoService){
  }
  onNgInit(){
    this.memoes=[];
  }
  ionViewDidLoad(){
    this.memoService.findMemoes().then(data=>{
      this.memoes=data;
    });
  }
  add(){
    this.nav.push(MemoAddPage,{});
  }
  filte(){

  }
  editMemo(p:Memo){
    this.nav.push(MemoAddPage,{memo:p,fdOrigin:'memo'});
  }
}
