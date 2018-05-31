import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AppService} from "./app.service";

@Injectable()
export class TodoService{
  constructor(private http:HttpClient,private appService:AppService){}
  public findAll(fdType:string):Observable<any>{
    return this.http.get(this.appService.baseUrl+'/sys/notify/todo/data?size=10&sortby=+fdValidTime&fdType='+fdType+'&start=0')
  }
}
