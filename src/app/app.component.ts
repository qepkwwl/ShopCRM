import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CustomerPage } from '../pages/customer/customer';
import {AuthService} from "../_services/auth.service";
import {ContractPage} from "../pages/contract/contract";
import {ProductPage} from "../pages/product/product";
import {BasePage} from "../pages/base/BasePage";
import {MemoPage} from "../pages/memo/memo";
import {FollowupPage} from "../pages/followup/followup";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,authService:AuthService) {
    this.initializeApp();
    platform.ready().then((readySource) => {
      BasePage.DeviceHeight=platform.height();
      BasePage.DeviceWidth=platform.width();
    });
    if(authService.isLogined()){
      this.rootPage=HomePage;
    }else{
      this.rootPage=LoginPage;
    }
    // used for an example of ngFor and navigation
    this.pages = [
      { title: '客户', component: CustomerPage },
      { title: '合同', component: ContractPage },
      { title: '商品', component: ProductPage },
      { title: '拜访', component: FollowupPage },
      { title: '日志', component: MemoPage },
      { title: '注销', component: LoginPage }
    ];

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
