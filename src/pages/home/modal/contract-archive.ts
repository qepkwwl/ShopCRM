import {Component} from "@angular/core";
import {NavController, NavParams, InfiniteScroll, ViewController} from "ionic-angular";
import {tap} from "rxjs/operators";
import {ContractsPivot} from "../../../_models/contracts-pivot";
import {Observable} from "rxjs";
import {ContractService} from "../../../_services/contract.service";
import {UserService} from "../../../_services/user.service";

@Component({
  templateUrl:"contract-archive.html",
  selector:"page-contract-archive"
})
export  class ContractArchivePage{
  //客户列表
  private contracts:Array<ContractsPivot>;
  //搜索的内容
  private fdCriterial:{fdDesc:string,fdStartDate:string,fdEndDate:string};
  //当面页码
  private indexPage:number=0;
  //服务器端是否还有更多数据
  private hasMoreRecords:boolean=true;
  private isAdmin:boolean=true;
  constructor(private view: ViewController,private nav:NavController,private navParams:NavParams,private contractService:ContractService,private userService:UserService){
    this.reset();
    this.isAdmin=this.userService.getRole()==="ROLE_ADMIN";
    this.fdCriterial={fdDesc:"合同",fdStartDate:"",fdEndDate:""};
  }
  reset(){
    this.contracts=[];
  }
  search(){
    this.indexPage=0;
    this.contracts=[];
    this.loadData().subscribe();
  }
  loadData():Observable<any>{
    return this.contractService.findPivot(this.fdCriterial.fdStartDate,this.fdCriterial.fdEndDate,this.indexPage).pipe(
    tap(data=>{
        let records=data.content.map(item=>{
          var c=new ContractsPivot(item);
          return c;
        });
        this.contracts=this.contracts.concat(records);
        this.indexPage++;
        this.hasMoreRecords=data.totalPages>this.indexPage;
      }));
  }
  doInfinite(infiniteScroll:InfiniteScroll){
    this.loadData().subscribe(data=>{
      infiniteScroll.complete();
    });
  }

  ionViewWillEnter() {
    this.fdCriterial=this.navParams.get("fdCriterial");
    this.search();
  }

  back() {
    this.view.dismiss({result:"back"});
  }
}
