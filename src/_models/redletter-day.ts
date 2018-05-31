//工作日志
import {BaseModel} from "./base-model";
export class RedletterDay extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++RedletterDay._id;
  }

  //日报周报还是月报
  fdKeyDay:string;
  fdCustomerId:number;
  fdCustomerName:string;
  fdName:string;
}
