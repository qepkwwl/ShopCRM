import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../_services/user.service";
import {NavController} from "ionic-angular";
import {MyApp} from "../../app/app.component";

@Component({
    selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit{
  ngOnInit(): void {
    this.userService.logout();
  }
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;

  constructor(private navCtrl: NavController,private userService:UserService) {
  }

  login(){
    this.userService.login("","");
    this.navCtrl.push(MyApp);
  }

}
