import {BaseModel} from "./base-model";
import {Contract} from "./contract";
import {Followup} from "./followup";
export class Customer extends BaseModel{
  constructor(param?){
    super(param);
  }
  static _id=0;
  getId(){
    super.getId();
    return ++Customer._id;
  }

  fdSubject:string;
  fdName:string;
  fdCreatorId:number;
  fdCreateTime:string;
  fdModifyTime:string;
  fdOrder:string;
  fdCode:string;
  fdCompanyAddr:string;
  fdSourceId:string;
  fdSourceName:string;
  fdLevelId:string;
  fdLevelName:string;
  fdFollowerId:string;
  fdFollowerName:string;
  fdPurposeId:string;
  fdPurposeName:string;
  fdGradeId:string;
  fdGradeName:string;
  fdTypeId:string;
  fdTypeName:string;
  fdHobby:string;
  fdMemo:string;
  fdCompanyName:string;
  fdStationPhone:string;
  fdLinkPhone:string;
  fdHomeAddr:string;
  fdBirthDay:string;
  fdCarNo:string;
  fdContracts:Array<Contract>;
  fdFollowups:Array<Followup>;
  fdContractCount:number;
}
