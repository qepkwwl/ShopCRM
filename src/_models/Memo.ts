//工作日志
import {MemoItem} from "./MemoItem";
import {BaseModel} from "./base-model";
export class Memo extends BaseModel{
  constructor(param?){
    super(param);
    this.fdPlanMemo=this.fdPlanMemo||[];
    this.fdSummaryMemo=this.fdSummaryMemo||[];
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Memo._id;
  }

  //日报周报还是月报
  fdType:string;
  fdStartDate:string;
  fdEndDate:string;
  fdAchieve:string;
  fdSummaryMemo:Array<MemoItem>;
  fdPlanMemo:Array<MemoItem>;

  public fdPlanMemoToString():string{
    return this.fdPlanMemo.map(m=>{return m.fdContent;}).join(";");
  }
  public fdSummaryMemoToString():string{
    return this.fdSummaryMemo.map(m=>{return m.fdContent;}).join(";");
  }
}
