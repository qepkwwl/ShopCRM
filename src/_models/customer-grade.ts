import {BaseModel} from "./base-model";
export class CustomerGrade extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++CustomerGrade._id;
  }

  fdName: string;
}
