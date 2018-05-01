
//合同中对应的产品明细
import {BaseModel} from "./base-model";
export class ContractProduct extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ContractProduct._id;
  }

  fdName:string;
  fdNum:number;
  fdProductId:number;
  //单价
  fdRetailPrice:number;
  fdDiscount:number;
  //指导价
  fdGardePrice:number;
  fdTotal:number;
  fdSaleType:string;
}
