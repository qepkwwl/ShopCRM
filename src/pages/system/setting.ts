import {NavController, ModalController} from "ionic-angular";
import {Component} from "@angular/core";
import {PersonResetPage} from "./modal/person-reset";
import {LoginPage} from "../login/login";

@Component({
  templateUrl:"setting.html",
  selector:"page-setting"
})
export  class SystemSettingPage{
  constructor(private nav:NavController,private modal:ModalController){

  }
  reset_password(){
    let personModal=this.modal.create(PersonResetPage);
    personModal.present();
  }

  logout(){
    this.nav.setRoot(LoginPage);
  }
}
