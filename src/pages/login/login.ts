import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {NavController, LoadingController} from "ionic-angular";
import {MyApp} from "../../app/app.component";

@Component({
    selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;
  private loading;
  constructor(private nav: NavController,private loadingCtrl: LoadingController,private userService:UserService) {
    this.loading = this.loadingCtrl.create({
      content: '正在登录...'
    });
  }
  ngOnInit(): void {
    this.userService.logout();
  }
  login(){
    this.loading.present();
    this.userService.login(this.username,this.password).subscribe(result => {
      this.loading.dismiss();
      if (result) {
        this.nav.push(MyApp);
      } else {
        console.log('用户名或密码错误');
      }
    });
  }

}
