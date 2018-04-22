import {BaseModel} from "./base-model";
import {Customer} from "./customer";
export class Followup extends BaseModel{
  constructor(param?){
    super(param);
    this.fdCustomer=this.fdCustomer||new Customer();
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Followup._id;
  }

  fdCustomer:Customer;
  //拜访时间
  fdTime:string;
  //拜访形式
  fdType:string;
  //拜访内容
  fdContent:string;
  //赠送礼物
  fdGift:string;
}
