import {Component, ViewChild} from "@angular/core";
import {Nav, Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {LoginPage} from "../pages/login/login";
import {AuthService} from "../_services/auth.service";
import {BasePage} from "../pages/base/BasePage";
import {TabsPage} from "../pages/home/tabs";
import {Subscription} from "rxjs";
import {AppService} from "../_services/app.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,authService:AuthService) {

    this.initializeApp();
    platform.ready().then((readySource) => {
      BasePage.DeviceHeight=platform.height();
      BasePage.DeviceWidth=platform.width();
      BasePage.DevicePlatform=(platform.is("ios")||platform.is("iphone")||platform.is("ipad"))?"ios":"android";
    });
    if(authService.isLogined()){
      this.rootPage=TabsPage;
    }else{
      this.rootPage=LoginPage;
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
