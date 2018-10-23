import {BaseModel} from "./base-model";
//合同集的按合同类型和客户经理透视
export class ContractsPivot extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++ContractsPivot._id;
  }
  fdTypeName:string;
  //合同总价
  fdTotal:number;
  fdCreatorName:string;
}
