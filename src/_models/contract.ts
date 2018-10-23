import {ContractProduct} from "./contractProduct";
import {ContractCustomer} from "./contractCustomer";
import {BaseModel} from "./base-model";
export class Contract extends BaseModel{
  constructor(param?){
    super(param);
    this.fdProducts=this.fdProducts||[];
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Contract._id;
  }
//是销售还是退货
  fdIsSale:string;
  fdStartTime:string;
  fdCustomer:ContractCustomer;
  fdCustomerId:number;
  fdCustomerName:string;
  fdCreatorId:number;
  fdCreateTime:string;
  //合同总价
  fdTotal:number;
  fdProducts:Array<ContractProduct>

  //合同中的产品信息描述
  public fdProductsToString(){
    return this.fdProducts.map((item,index)=>{
      return item.fdName+":"+item.fdNum+"件"+item.fdTotal+"元"
    }).join(";");
  }
}
