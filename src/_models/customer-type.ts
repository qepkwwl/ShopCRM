import {BaseModel} from "./base-model";
export class CustomerType extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++CustomerType._id;
  }

  fdName: string;
}
