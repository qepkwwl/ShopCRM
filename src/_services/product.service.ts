import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Product} from "../_models/product";
import {Injectable} from "@angular/core";

@Injectable()
export class ProductService{
  constructor(private http:HttpClient){}
  public findProductByCustomer():Promise<Array<Product>>{
    return new Promise((resolve,reject)=>{});
  }
  public findProduct():Promise<Array<Product>>{
    return new Promise((resolve,reject)=>{
      resolve([new Product({id:1,fdName:'贡多拉',fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:168,fdImageId:"1"}),
        new Product({id:2,fdName:'威尼斯小船',fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:168,fdImageId:"2"}),
        new Product({id:3,fdName:'法米拉',fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:128,fdImageId:"3"}),
        new Product({id:4,fdName:'彼西尼',fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:328,fdImageId:"4"}),
        new Product({id:5,fdName:'黄金珍藏',fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:468,fdImageId:"5"}),
        new Product({id:6,fdName:'彼西尼红/白',fdProductType:'分销',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:98,fdImageId:"6"}),
        new Product({id:7,fdName:'皇后城堡帕吉',fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:198,fdImageId:"7"}),
        new Product({id:8,fdName:'皇后城堡王子',fdProductType:'团购',fdProduceArea:'意大利',fdSpecify:'750ml',fdGuidePrice:398,fdImageId:"8"}),
        new Product({id:9,fdName:'君封干红',fdProductType:'分销',fdProduceArea:'摩尔多瓦',fdSpecify:'750ml',fdGuidePrice:798,fdImageId:"9"}),
        new Product({id:10,fdName:'荣誉干红',fdProductType:'分销',fdProduceArea:'摩尔多瓦',fdSpecify:'750ml',fdGuidePrice:178,fdImageId:"10"})]);
    });
  }
}
