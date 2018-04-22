import {ContractProduct} from "./contractProduct";
import {Customer} from "./customer";
import {ContractCustomer} from "./contractCustomer";
import {BaseModel} from "./base-model";
export class Contract extends BaseModel{
  constructor(param?){
    super(param);
    this.fdProducts=[];
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Contract._id;
  }

  fdStartTime:string;
  fdCustomer:ContractCustomer;
  //合同总价
  fdTotal:number;
  fdProducts:Array<ContractProduct>

}
