import {UserService} from "../../_services/user.service";
import {ToggleonclickDirective} from "../../_directive/ToggleOnClick";

export class BasePage{
  //设备宽度
  public static DeviceWidth:number;
  //设备高度
  public static DeviceHeight:number;
  //设备操作系统
  public static DevicePlatform:string;
  //当前是否是管理员
  protected isAdmin:boolean=true;
  constructor(protected userService:UserService){
    this.isAdmin=this.userService.getRole()==="ROLE_ADMIN";
  }

  toggleContent(){
    console.log(arguments);
  }
}
