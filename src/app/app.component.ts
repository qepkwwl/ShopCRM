import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginPage} from "../pages/login/login";
import {AuthService} from "../_services/auth.service";
import {BasePage} from "../pages/base/BasePage";
import {TabsPage} from "../pages/home/tabs";
import {tap} from "rxjs/operators";
import { HotCodePush } from '@ionic-native/hot-code-push';
import {AdPage} from "../pages/home/adpage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  constructor(public platform: Platform, public statusBar: StatusBar,private chcp:HotCodePush,public splashScreen: SplashScreen,authService:AuthService) {

    this.initializeApp();
    this.rootPage=AdPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      BasePage.DeviceHeight=this.platform.height();
      BasePage.DeviceWidth=this.platform.width();
      BasePage.DevicePlatform=(this.platform.is("ios")||this.platform.is("iphone")||this.platform.is("ipad"))?"ios":"android";
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
