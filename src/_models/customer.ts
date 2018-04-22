import {BaseModel} from "./base-model";
export class Customer extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Customer._id;
  }

  fdName:string;
  fdNo:string;
  fdTel:string;
  fdCompanyName:string;
  fdCompanyAddr:string;
  fdBirthday:string;
  fdHomeAddr:string;
  fdCompanyContact:string;
  fdLinkerPhone:string;
  fdConsumeLevel:string;
  fdType:string;
  fdBuyPurpose:string;
  fdGrade:string;
  fdBehavior:string;
  fdRemark:string;
  fdCar:string;
}
