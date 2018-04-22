import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Memo} from "../_models/Memo";
import {MemoItem} from "../_models/MemoItem";

@Injectable()
export class MemoService{
  constructor(private http:HttpClient){}

  public findMemoes():Promise<Array<Memo>>{
    return new Promise((resolve,reject)=>{
      resolve([
        new Memo({fdType:'日报',fdStartDate:'2018-04-11',fdEndDate:'2018-04-11',fdAchieve:'业绩5000元',fdSummaryMemo:[new MemoItem({fdContent:'上午早会'}),new MemoItem({fdContent:'下午致电张家界叶总，现在侯家塘开了一个餐厅，这两天去看看。'})],fdPlanMemo:[new MemoItem({fdContent:'继续回访客户'}),new MemoItem({fdContent:'沈建3月用酒回款沟通'})]}),
        new Memo({fdType:'周报',fdStartDate:'2018-04-16',fdEndDate:'2018-04-22',fdAchieve:'业绩15000元',fdSummaryMemo:[new MemoItem({fdContent:'上午早会'}),new MemoItem({fdContent:'下午致电张家界叶总，现在侯家塘开了一个餐厅，这两天去看看。'})],fdPlanMemo:[new MemoItem({fdContent:'继续回访客户'}),new MemoItem({fdContent:'沈建3月用酒回款沟通'})]})]);
    });
  }
}
