export class BaseModel{
  id:number;
  constructor(param?){
    Object.assign(this, param||{} );
    this.id=this.id||this.getId();
  }
  getId():number{
    return 0;
  }
}
