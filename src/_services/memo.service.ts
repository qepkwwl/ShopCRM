import {HttpClient} from "@angular/common/http";
import "rxjs/add/operator/map";
import {Injectable} from "@angular/core";

@Injectable()
export class MemoService{
  constructor(private http:HttpClient){}
}
