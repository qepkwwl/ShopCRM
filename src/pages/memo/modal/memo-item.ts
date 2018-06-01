import {Component, ViewChild} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";
import {MemoItem} from "../../../_models/MemoItem";

@Component({
  templateUrl:"memo-item.html",
  selector:"page-memo-item"
})
export  class MemoItemPage{
  private memoItem:MemoItem;

  @ViewChild('fdContent') fdContent: any;
  constructor(private view: ViewController,private navParams:NavParams){
    this.reset();
  }
  ionViewWillEnter=function () {
    this.memoItem=new MemoItem(this.navParams.get("memoItem"));
    this.fdTitle=this.navParams.get("fdTitle");
  }
  ionViewDidLoaded() {

    setTimeout(() => {
      this.fdContent.setFocus();
    },150);

  }
  reset(){
    this.memoItem=new MemoItem();
  }
  save() {
    this.view.dismiss({memoItem:this.memoItem,result:"save"});
  }
  back() {
    this.view.dismiss({result:"back"});
  }

  delete() {
    this.view.dismiss({memoItem:this.memoItem,result:"delete"});
  }
}
