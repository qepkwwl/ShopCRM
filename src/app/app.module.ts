import {BrowserModule} from "@angular/platform-browser";
import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
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
import {CustomerEditPage} from "../pages/customer/customer-edit";
import {PersonResetPage} from "../pages/system/modal/person-reset";
import {AppVersion} from "@ionic-native/app-version";
import {SystemSettingPage} from "../pages/system/setting";
import {FollowupTypeService} from "../_services/followup-type.service";
import {ContractProductTypeService} from "../_services/contractproduct-type.service";
import {ContractViewPage} from "../pages/contract/contract-view.component";
import {TodoService} from "../_services/todo.service";
import {HotCodePush} from "@ionic-native/hot-code-push";
import {ProductOpinionPage} from "../pages/contract/modal/product-opinion";
import {AdPage} from "../pages/home/adpage";
import {ContractArchivePage} from "../pages/home/modal/contract-archive";
import {ContractEditPage} from "../pages/contract/contract-edit.component";
import {ToggleonclickDirective} from "../_directive/ToggleOnClick";
import {FollowupEditPage} from "../pages/followup/followup-edit";
import {ContractSearchPage} from "../pages/contract/modal/contract-search";
import {CustomerSearchPage} from "../pages/customer/modal/customer-search";
import {FollowupSearchPage} from "../pages/followup/modal/followup-search";
import {ProductMemoPage} from "../pages/contract/modal/product-memo";

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
    CustomerEditPage,
    CustomerSearchPage,
    ProductPage,
    ContractProductPage,
    FollowupPage,
    FollowupAddPage,
    FollowupEditPage,
    FollowupSearchPage,
    MemoPage,
    MemoAddPage,
    MemoItemPage,
    CustomerViewPage,
    TabsPage,
    RedletterDayPage,
    RedletterDayAddPage,
    PersonResetPage,
    SystemSettingPage,
    ContractViewPage,
    ProductMemoPage,
    ContractArchivePage,
    ContractEditPage,
    ContractSearchPage,
    ProductOpinionPage,
    AdPage,
    ToggleonclickDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '返回',
      cancelText:'取消',
      doneText:'选定',
      monthNames: ['一月', '二月', '三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      monthShortNames:['01', '02', '03','04','05','06','07','08','09','10','11','12'],
      dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      dayShortNames: ['一', '二', '三', '四', '五', '六', '日']})
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
    CustomerEditPage,
    CustomerSearchPage,
    ProductPage,
    ContractProductPage,
    FollowupPage,
    FollowupAddPage,
    FollowupEditPage,
    FollowupSearchPage,
    MemoPage,
    MemoAddPage,
    MemoItemPage,
    CustomerViewPage,
    TabsPage,
    RedletterDayPage,
    RedletterDayAddPage,
    PersonResetPage,
    SystemSettingPage,
    ContractViewPage,
    ProductMemoPage,
    ContractArchivePage,
    ContractEditPage,
    ContractSearchPage,
    ProductOpinionPage,
    AdPage
  ],
  providers: [
    AuthService,
    UserService,
    ContractService,
    ContractProductTypeService,
    ProductService,
    CustomerService,
    CustomerGradeService,
    CustomerTypeService,
    CustomerLevelService,
    CustomerPurposeService,
    CustomerSourceService,
    FollowupService,
    FollowupTypeService,
    RedletterDayService,
    MemoService,
    AppService,
    AppVersion,
    StatusBar,
    SplashScreen,
    CallNumber,
    TodoService,
    HotCodePush,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi: true}
  ]
})
export class AppModule {}
