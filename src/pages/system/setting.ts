import {MemoService} from "../../_services/memo.service";
import {NavController, NavParams, ModalController, Events, ToastController, Toast, Platform} from "ionic-angular";
import {Component} from "@angular/core";
import {AppVersion} from "@ionic-native/app-version";
import {PersonResetPage} from "./modal/person-reset";
import {LoginPage} from "../login/login";
import {AppService} from "../../_services/app.service";
import {UserService} from "../../_services/user.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

@Component({
  templateUrl:"setting.html",
  selector:"page-setting"
})
export  class SystemSettingPage{
  private toast:Toast;
  constructor(private nav:NavController,private appVersion:AppVersion,private toastCtrl:ToastController,private navParams:NavParams,private  event:Events,private modal:ModalController,private iab: InAppBrowser,private appService:AppService,private userService:UserService){

  }
  btnCheckVersion(){
    this.toast = this.toastCtrl.create({
      duration:1000
    });
    this.appVersion.getVersionNumber().then(data=>{
      this.userService.getVersion().subscribe(version=>{
        if(data!=version.version){
          const browser = this.iab.create(this.appService.baseUrl+'/sys/admin/system/download','_system','location=yes');
        }else{
          this.toast.setMessage('当前已是最新版本');
          this.toast.present();
        }
      });
    },error=>{
      this.toast.setMessage('读取版本失败');
      this.toast.present();
    });
  }

  reset_password(){
    let personModal=this.modal.create(PersonResetPage);
    personModal.present();
  }

  logout(){
    this.nav.setRoot(LoginPage);
  }
}
