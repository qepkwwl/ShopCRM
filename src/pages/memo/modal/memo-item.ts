import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavController, NavParams, ViewController} from "ionic-angular";
import {MemoItem} from "../../../_models/MemoItem";

@Component({
  templateUrl:"memo-item.html",
  selector:"page-memo-item"
})
export  class MemoItemPage{
  private memoItem:MemoItem;
  private fdTitle:string;
  @ViewChild('fdContent') fdContent: any;
  constructor(private view: ViewController,private navParams:NavParams){
    this.reset();
  }
  ionViewWillEnter=function () {
    this.memoItem=new MemoItem(this.navParams.get("memoItem")).reset();
    this.fdTitle=this.navParams.get("fdTitle");
  }
  ionViewLoaded() {

    setTimeout(() => {
      this.fdContent.setFocus();
    },150);

  }
  reset(){
    this.memoItem=new MemoItem().reset();
  }
  save() {
    this.view.dismiss({memoItem:this.memoItem,result:"save"});
  }
  resize() {
    this.fdContent.nativeElement.style.height = this.fdContent.nativeElement.scrollHeight + 'px';
  }
  back() {
    this.view.dismiss({result:"back"});
  }

  delete() {
    this.view.dismiss({memoItem:this.memoItem,result:"delete"});
  }
}
