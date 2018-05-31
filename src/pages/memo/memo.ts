import {Component} from "@angular/core";
import {NavController, InfiniteScroll} from "ionic-angular";
import {MemoService} from "../../_services/memo.service";
import {Memo} from "../../_models/Memo";
import {MemoAddPage} from "./memo-add";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {MemoItem} from "../../_models/MemoItem";
@Component({
  templateUrl:"memo.html",
  selector:"page-memo"
})
export  class MemoPage{
  private memoes:Array<Memo>=[];
  //搜索的内容
  private fdSearchValue:string='';
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;

  constructor(private nav:NavController,private memoService:MemoService){
  }
  onNgInit(){
    this.memoes=[];
  }
  ionViewWillEnter(){
    this.indexPage=0;
    this.memoes=[];
    this.loadData().subscribe();
  }

  search(ev: any){
    this.fdSearchValue=ev.target.value;
    this.indexPage=0;
    this.memoes=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.memoService.findAll(this.fdSearchValue,this.indexPage).pipe(
      tap(data=>{
        let newRecords=data.content.map(item=>{
          let m= new Memo(item);
          m.fdPlanMemoes=item.fdPlanMemoes.map(p=>Object.assign(new MemoItem(),p));
          m.fdSummaryMemoes=item.fdSummaryMemoes.map(p=>Object.assign(new MemoItem(),p));
          return m;
        });
        this.memoes=this.memoes.concat(newRecords);
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
    this.nav.push(MemoAddPage,{});
  }
  filte(){

  }
  editMemo(p:Memo){
    this.nav.push(MemoAddPage,{memo:p,fdOrigin:'memo'});
  }
}
