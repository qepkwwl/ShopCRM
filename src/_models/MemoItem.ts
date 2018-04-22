//工作日志
import {BaseModel} from "./base-model";
export class MemoItem extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++MemoItem._id;
  }

  fdContent:string;
}
