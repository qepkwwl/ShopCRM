import {BaseModel} from "./base-model";
export class Followup extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Followup._id;
  }
  fdCreatorId:number;
  fdCreatorName:string;
  fdCreateTime:string;
  //拜访时间
  fdCustomerId:number;
  fdCustomerName:string;
  //拜访时间
  fdDate:string;
  //拜访时间
  fdTime:string;
  //拜访形式
  fdType:string;
  //拜访内容
  fdContent:string;
  //赠送礼物
  fdGift:string;
}
