import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Contract} from "../_models/contract";
import {ContractCustomer} from "../_models/contractCustomer";
import {ContractProduct} from "../_models/contractProduct";

@Injectable()
export class ContractService{
  constructor(private http:HttpClient){}

  public findContractByCustomer():Promise<Array<Contract>>{
    return new Promise((resolve,reject)=>{});
  }
  public findContract():Promise<Array<Contract>>{
    return new Promise((resolve,reject)=>{
      resolve([new Contract({fdTotal:768,
        fdCustomer:new ContractCustomer({id:1,fdName:'张馨文',fdTel:'13973105080',fdCompanyName:'',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdType:'渠道',fdRemark:'比较直爽，也比较精明。'}),
        fdProducts:[new ContractProduct({id:1,fdName:'贡多拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"1"}),
          new ContractProduct({id:2,fdName:'威尼斯小船',fdNum:10,fdSubtotal:100,fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"2"}),
          new ContractProduct({id:3,fdName:'法米拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:128,fdImageId:"3"})]}),
        new Contract({fdTotal:768,
          fdCustomer:new ContractCustomer({id:1,fdName:'张馨文',fdTel:'13973105080',fdCompanyName:'',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdType:'渠道',fdRemark:'比较直爽，也比较精明。'}),
          fdProducts:[new ContractProduct({id:1,fdName:'贡多拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"1"}),
            new ContractProduct({id:2,fdName:'威尼斯小船',fdNum:10,fdSubtotal:100,fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"2"}),
            new ContractProduct({id:3,fdName:'法米拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:128,fdImageId:"3"})]}),
        new Contract({fdTotal:768,
          fdCustomer:new ContractCustomer({id:1,fdName:'张馨文',fdTel:'13973105080',fdCompanyName:'',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdType:'渠道',fdRemark:'比较直爽，也比较精明。'}),
          fdProducts:[new ContractProduct({id:1,fdName:'贡多拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"1"}),
            new ContractProduct({id:2,fdName:'威尼斯小船',fdNum:10,fdSubtotal:100,fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"2"}),
            new ContractProduct({id:3,fdName:'法米拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:128,fdImageId:"3"})]}),
        new Contract({fdTotal:768,
          fdCustomer:new ContractCustomer({id:1,fdName:'张馨文',fdTel:'13973105080',fdCompanyName:'',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdType:'渠道',fdRemark:'比较直爽，也比较精明。'}),
          fdProducts:[new ContractProduct({id:1,fdName:'贡多拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"1"}),
            new ContractProduct({id:2,fdName:'威尼斯小船',fdNum:10,fdSubtotal:100,fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:168,fdImageId:"2"}),
            new ContractProduct({id:3,fdName:'法米拉',fdNum:10,fdSubtotal:100,fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdRetailPrice:128,fdImageId:"3"})]})
      ]);
    });
  }
}
