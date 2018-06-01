import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AuthService} from "../../_services/auth.service";
import {TabsPage} from "./tabs";
import {LoginPage} from "../login/login";

@Component({
  templateUrl: 'adpage.html',
  selector: 'page-adpage'
})
export class AdPage {
  constructor(private navCtrl:NavController,private authService:AuthService) {
  }
  ionViewWillEnter(){
    setTimeout(()=>{
      if(this.authService.isLogined()){
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    },3000)
  }
}
