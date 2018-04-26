import { Component } from '@angular/core';
import {CustomerPage} from "../customer/customer";
import {ContractPage} from "../contract/contract";
import {ProductPage} from "../product/product";
import {FollowupPage} from "../followup/followup";
import {MemoPage} from "../memo/memo";
import {LoginPage} from "../login/login";
import {HomePage} from "./home";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private customer:any;
  private contract:any;
  private product:any;
  private followup:any;
  private memo:any;
  private home:any;
  constructor() {
// used for an example of ngFor and navigation
    this.customer = CustomerPage;
    this.contract = ContractPage;
    this.product = ProductPage;
    this.followup = FollowupPage;
    this.memo = MemoPage;
    this.home = HomePage;
  }
}
