import {Component, ViewChild} from "@angular/core";
import {NavParams, ViewController, ToastController, Toast} from "ionic-angular";
import {FormBuilder, NgForm} from "@angular/forms";
import {UserService} from "../../../_services/user.service";

@Component({
  templateUrl:"person-reset.html",
  selector:"page-person-reset"
})
export  class PersonResetPage{
  private fdPassword:string;
  private fdNewPassword:string;
  private fdRepeatPassword:string;

  private toast:Toast;
  constructor(private view: ViewController,private toastCtrl:ToastController,private navParams:NavParams,private userService:UserService){
  }
 ngOnInit(){
 }
  save() {
    this.toast = this.toastCtrl.create({
      message:'',
      duration:1000
    });
    if(!this.fdPassword){
      this.toast.setMessage("原密码必填");
      this.toast.present();
      return;
    }
    if(!this.fdNewPassword){
      this.toast.setMessage("新密码必填");
      this.toast.present();
      return;
    }
    if(this.fdNewPassword!=this.fdRepeatPassword){
      this.toast.setMessage("两次密码输入不一致");
      this.toast.present();
      return;
    }
    this.userService.resetPassword(this.fdPassword,this.fdNewPassword).subscribe(data=>{
      if(data.fdCode=="OK"){
        this.toast.setMessage("修改成功");
        this.toast.present();
        this.view.dismiss();
      }else{
        this.toast.setMessage(data.fdMsg);
        this.toast.present();
      }
    });
  }
  back() {
    this.view.dismiss();
  }
}
