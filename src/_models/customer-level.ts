import {BaseModel} from "./base-model";
export class CustomerLevel extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++CustomerLevel._id;
  }

  fdName: string;
}
