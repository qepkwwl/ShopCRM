import {BaseModel} from "./base-model";
export class FollowupType extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++FollowupType._id;
  }

  fdName: string;
}
