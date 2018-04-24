import {SQLite, SQLiteObject} from "@ionic-native/sqlite";
import {Injectable} from "@angular/core";
import { File } from '@ionic-native/file';

@Injectable()
export class DbProvider{
  constructor(private sqlite: SQLite,private file: File) { }
    init(){
      this.file.createDir(this.file.dataDirectory,"data",false).then(_=>{}).catch(_=>{});
      this.file.createDir(this.file.dataDirectory,"products",false).then(_=>{}).catch(_=>{});
      this.file.checkFile(this.file.dataDirectory+"data","data.db").then(result=>{
        if(!result){
          this.sqlite.create({
            name: 'data.db',
            location: this.file.dataDirectory+"data"
          }).then((db: SQLiteObject) => {
              db.executeSql('create table products(id number,fdName string)', {})
                .then(() => console.log('Executed SQL'))
                .catch(e => console.log(e));
            })
            .catch(e => console.log(e));
        }
      });
  }
}
