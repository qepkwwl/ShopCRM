import {BaseModel} from "./base-model";
export class Achieve extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Achieve._id;
  }
  fdMonthCompleted:number=0;
  fdMonthAchieved:number=0;
  fdYearCompleted:number=0;
  fdYearAchieved:number=0;
}
