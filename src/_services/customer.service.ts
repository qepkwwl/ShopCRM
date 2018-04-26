import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Customer} from "../_models/customer";
import {Injectable} from "@angular/core";

@Injectable()
export class CustomerService{
  constructor(private http:HttpClient){}

  public findCustomer():Promise<Array<Customer>>{
    return new Promise((resolve,reject)=>{
      resolve([new Customer({id:1,fdName:'张馨文',fdTel:'13973105080',fdCompanyName:'湖南华韵成套设备有限公司',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdType:'渠道',fdRemark:'比较直爽，也比较精明。'}),
        new Customer({id:2,fdName:'戴总',fdTel:'',fdCompanyName:'',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100以下',fdBuyPurpose:'二次销售',fdCar:'宝马JOZ99',fdType:'渠道',fdRemark:'娄底人，会所在娄底，自己在长沙，有兴趣了解下供应酒情况，杨思维朋友'}),
        new Customer({id:3,fdName:'刘建忠',fdTel:'13973105080',fdCompanyName:'湖南华韵成套设备有限公司',fdCompanyAddr:'长沙大道附近',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'300-500以上',fdCar:'宝马JOZ99',fdBuyPurpose:'餐中客户',fdType:'团购',fdRemark:'45左右，171 cm左右，陕西汉中人，做医疗设备，主要请红爹喜欢吃牛肉，老面馒头希望餐标不要太高。'}),
        new Customer({id:4,fdName:'蒋总',fdTel:'',fdCompanyName:'华百利投资有限公司',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100以下',fdCar:'红色宝马X6',fdBuyPurpose:'公司接待，自用，二次销售',fdType:'团购',fdRemark:'个性比较急躁，为人豪爽。'}),
        new Customer({id:5,fdName:'黄虎',fdTel:'',fdCompanyName:'沃尔沃4S店',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'',fdBuyPurpose:'公司接待',fdBehavior:'足球、跑步',fdType:'团购',fdRemark:'85年左右，戴眼镜，170cm高。湘潭人'}),
        new Customer({id:6,fdName:'赵超军',fdTel:'',fdCompanyName:'教育电视台制片人',fdCompanyAddr:'',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'银色大众792',fdBuyPurpose:'分销销售',fdBehavior:'打麻将',fdType:'',fdRemark:'电视台制片人，戴眼镜，45左右，165左右。为人热情，能帮朋友。平时很忙，老婆在家开了幼儿园，主要带仔'}),
        new Customer({id:7,fdName:'余灏',fdTel:'',fdCompanyName:'曙光路公安处',fdCompanyAddr:'曙光路二里牌',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'',fdBuyPurpose:'自用',fdType:'',fdRemark:'同学，南铁公安局的，喜欢喝红酒但价格不高，经常网购。喜欢自己做吃的，有个仔'}),
        new Customer({id:8,fdName:'袁婧',fdTel:'',fdCompanyName:'平安保险',fdCompanyAddr:'曙光路',fdBirthday:'',fdHomeAddr:'',fdCompanyContact:'',fdConsumeLevel:'100-300',fdCar:'',fdBuyPurpose:'自用，送礼',fdType:'',fdRemark:'36岁左右，老公在北辰做财务，有个儿子要上小学。买酒主要是送客户和送朋友'})]);
    });
  }
}
