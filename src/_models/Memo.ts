//工作日志
import {MemoItem} from "./MemoItem";
import {BaseModel} from "./base-model";
export class Memo extends BaseModel{
  constructor(param?){
    super(param);
    this.fdPlanMemoes=this.fdPlanMemoes||[];
    this.fdSummaryMemoes=this.fdSummaryMemoes||[];
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
  fdCreatorId:number;
  fdCreatorName:string;
  fdSummaryMemoes:Array<MemoItem>;
  fdPlanMemoes:Array<MemoItem>;

  public fdPlanMemoesToString():string{
    return this.fdPlanMemoes.map(m=>{return m.fdContent;}).join(";");
  }
  public fdSummaryMemoesToString():string{
    return this.fdSummaryMemoes.map(m=>{return m.fdContent;}).join(";");
  }
}
