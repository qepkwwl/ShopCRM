import {BaseModel} from "./base-model";
export class CustomerPurpose extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++CustomerPurpose._id;
  }

  fdName: string;
}
