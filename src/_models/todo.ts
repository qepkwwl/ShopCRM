import {BaseModel} from "./base-model";
export class Todo extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Todo._id;
  }
  //拜访时间
  fdModelId:string;
  fdModelName:string;
  //拜访时间
  fdType:string;
  //拜访时间
  fdName:string;
}
