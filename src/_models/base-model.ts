export class BaseModel{
  id:number;
  constructor(param?){
    Object.assign(this, param||{} );
    this.id=this.id||this.getId();
  }
  public reset(){
    this.id=this.id||this.getId();
    return this;
  }
  getId():number{
    return 0;
  }
}
