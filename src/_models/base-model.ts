export class BaseModel{
  id:number;
  constructor(param?){
    Object.assign(this, param||{} );
    let ps=Object.getOwnPropertyNames(this);
    for(let p of ps){
      if(this[p]=='null'){
        this[p]="";
      }
    }
    this.id=this.id||this.getId();
  }
  getId():number{
    return 0;
  }

  toFormData(){
    const formData = new FormData();
    let ps=Object.getOwnPropertyNames(this);
    for(let p of ps){
      formData.append(p,this[p]);
    }
    return formData;
  }
}
