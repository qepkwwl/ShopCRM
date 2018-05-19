import {BaseModel} from "./base-model";
export class ContractProductType extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++ContractProductType._id;
  }

  fdName: string;
}
