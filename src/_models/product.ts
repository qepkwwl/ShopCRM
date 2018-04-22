import {BaseModel} from "./base-model";
export class Product extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Product._id;
  }

  fdName:string;
  fdProduceArea:string;
  fdProductType:string;
  fdSpecify:string;
  fdGuidePrice:number;
  fdImageId:string;
  //信息更新时间
  fdModefiTime:number;
  //是否被选中
  fdIsChecked:boolean;
}
