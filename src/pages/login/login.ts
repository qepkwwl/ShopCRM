import {Component} from "@angular/core";
import {UserService} from "../../_services/user.service";
import {NavController, LoadingController, Toast, Loading, ToastController} from "ionic-angular";
import {MyApp} from "../../app/app.component";

@Component({
    selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage{
  private username: string;
  private password: string;
  private loading:Loading;
  private toast:Toast;
  constructor(private nav: NavController,private loadingCtrl: LoadingController,private toastCtrl:ToastController,private userService:UserService) {
    this.loading = this.loadingCtrl.create({
      content: '正在登录...'
    });
  }
  ionViewWillEnter(): void {
    this.userService.logout();
  }
  login(){
    this.loading.present();
    this.userService.login(this.username,this.password).subscribe(result => {
      this.loading.dismiss();
      if (result) {
        this.nav.push(MyApp);
      } else {
        this.toast = this.toastCtrl.create({
          message:'用户名或密码错误',
          duration:1000
        });
        this.toast.present();
      }
    });
  }

}
