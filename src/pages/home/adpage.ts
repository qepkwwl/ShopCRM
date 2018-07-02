import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TabsPage} from "./tabs";
import {LoginPage} from "../login/login";
import {AppService} from "../../_services/app.service";
import {AuthService} from "../../_services/auth.service";

@Component({
  templateUrl: 'adpage.html',
  selector: 'page-adpage'
})
export class AdPage {
  private adUrl:string="";
  constructor(private navCtrl:NavController,private authService:AuthService,private appService:AppService) {
  }
  ionViewWillEnter(){
    this.adUrl=this.appService.baseUrl+"/sys/admin/ad/image/1.jpg?version"+(new Date().getTime());
    setTimeout(()=>{
      if(this.authService.isLogined()){
        this.navCtrl.setRoot(TabsPage);
      }else{
        this.navCtrl.setRoot(LoginPage);
      }
    },3000)
  }
}
