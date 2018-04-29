import {BaseModel} from "./base-model";
export class CustomerSource extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++CustomerSource._id;
  }

  fdName: string;
}
