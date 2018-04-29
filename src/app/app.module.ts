import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule, Events} from "ionic-angular";
import {File} from "@ionic-native/file";
import {SQLite} from "@ionic-native/sqlite";
import {MyApp} from "./app.component";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ListPage} from "../pages/list/list";
import {CustomerPage} from "../pages/customer/customer";
import {ContractPage} from "../pages/contract/contract";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {UserService} from "../_services/user.service";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {CustomerAddPage} from "../pages/customer/customer-add.component";
import {AuthService} from "../_services/auth.service";
import {CloudSettings} from "@ionic/cloud";
import {ContractAddPage} from "../pages/contract/contract-add.component";
import {ProductPage} from "../pages/product/product";
import {ContractProductPage} from "../pages/contract/modal/contract-product";
import {FollowupPage} from "../pages/followup/followup";
import {FollowupAddPage} from "../pages/followup/followup-add";
import {ContractService} from "../_services/contract.service";
import {ProductService} from "../_services/product.service";
import {CustomerService} from "../_services/customer.service";
import {FollowupService} from "../_services/followup.service";
import {MemoService} from "../_services/memo.service";
import {MemoPage} from "../pages/memo/memo";
import {MemoAddPage} from "../pages/memo/memo-add";
import {MemoItemPage} from "../pages/memo/modal/memo-item";
import {CustomerViewPage} from "../pages/customer/customer-view";
import {FormsModule} from "@angular/forms";
import {DbProvider} from "../_helpers/DbProvider";
import {TabsPage} from "../pages/home/tabs";
import {CallNumber} from "@ionic-native/call-number";
import {SearchFilterPipe} from "../_helpers/SearchFilterPipe";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RedletterDayPage} from "../pages/redletter-day/redletter";
import {RedletterDayAddPage} from "../pages/redletter-day/redletter-add";
import {RedletterDayService} from "../_services/redletter-day.service";
import {TokenInterceptor} from "../_helpers/TokenInterceptor";
import {AppService} from "../_services/app.service";
import {CustomerGradeService} from "../_services/customer-grade.service";
import {CustomerTypeService} from "../_services/customer-type.service";
import {CustomerLevelService} from "../_services/customer-level.service";
import {CustomerPurposeService} from "../_services/customer-purpose.service";
import {CustomerSourceService} from "../_services/customer-source.service";
import {JwtInterceptor} from "../_helpers/JwtInterceptor";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '013473e5'
  }
};
@NgModule({
  declarations: [
    MyApp,
    SearchFilterPipe,
    LoginPage,
    HomePage,
    ListPage,
    CustomerPage,
    ContractPage,
    ContractAddPage,
    CustomerAddPage,
    ProductPage,
    ContractProductPage,
    FollowupPage,
    FollowupAddPage,
    MemoPage,
    MemoAddPage,
    MemoItemPage,
    CustomerViewPage,
    TabsPage,
    RedletterDayPage,
    RedletterDayAddPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    CustomerPage,
    ContractPage,
    ContractAddPage,
    CustomerAddPage,
    ProductPage,
    ContractProductPage,
    FollowupPage,
    FollowupAddPage,
    MemoPage,
    MemoAddPage,
    MemoItemPage,
    CustomerViewPage,
    TabsPage,
    RedletterDayPage,
    RedletterDayAddPage
  ],
  providers: [
    AuthService,
    UserService,
    ContractService,
    ProductService,
    CustomerService,
    CustomerGradeService,
    CustomerTypeService,
    CustomerLevelService,
    CustomerPurposeService,
    CustomerSourceService,
    FollowupService,
    RedletterDayService,
    MemoService,
    AppService,
    StatusBar,
    SplashScreen,
    File,
    SQLite,
    DbProvider,
    CallNumber,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}
  ]
})
export class AppModule {}
