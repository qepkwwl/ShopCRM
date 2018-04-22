import {BaseModel} from "./base-model";
export class ContractCustomer extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++ContractCustomer._id;
  }

  fdName:string;
  fdNo:string;
  fdTel:string;
  fdCompanyName:string;
  fdCompanyAddr:string;
  fdBirthday:string;
  fdHomeAddr:string;
  fdCompanyContact:string;
  fdGrade:string;
  //是否被选中
  fdIsChecked:boolean;
}
