import { Db,decrypt,encrypt } from './utils/utils';



type Config = {
  appId:string,
  secretString:string;
  address:string,
  url:string
}

type admin = {
  name:string|null;
  pass:string | null
}

type Data = {
  secret:string | null,
  gateway:string | null,
  appId:string | null,
  admin:admin ,
  address:string | null,
  url:string | null;
  db:any,
}


export class IPFSDB {
  private config:Data = {
    secret:null,
    gateway:null,
    appId:null,
    address:null,
    admin:{
      name:null,
      pass:null
    },
    db:null,
    url:null
  }

  constructor(config:Config){
    if(!config.appId && !config.secretString && !config.address && !config.url){
      throw new Error("all fields are required")
    }
    else if(!config.appId){
      throw new Error("appId is missing!!")
    }
    else if(config.address.length !== 42){
      throw new Error("Invalid address")
    }
    else if(config.appId.length !== 16){
      throw new Error("Invalid appId")
    }
    else if(config.secretString.length === 0){
      throw new Error("Invalid secretString!!")
    }
    else if(!config.url){
      throw new Error("Invalid url!!")
    }
    else {
      const scheme = decrypt(config.secretString,config.appId);
      if(!scheme ){
        throw new Error("Invalid secretString or appId")
      }
      else {
        const data = scheme.split("%",scheme.length)
        this.config.secret = encrypt(data[1],config.appId) ;
        this.config.gateway = encrypt(data[0],config.appId);
        this.config.appId = config.appId;
        this.config.admin.name = data[2]
        this.config.admin.pass = encrypt(data[3],config.appId);
        this.config.address = encrypt(config.address,config.appId)
        this.config.url = encrypt(config.url,config.appId)
        this.config.db = new Db({address:config.address,appId:config.appId,secret:data[1],admin:{name:data[2],pass:data[3]},gateway:data[0],url:config.url})
      }
    }
  }


  public async getIpfsHash(gateway:boolean = false){
    const hash = await this.config.db.getHash(gateway);
    return hash;
  }

  public Collection(name:string):(Collection | null){
    try {
      if(this.config.gateway!== null && this.config.secret !== null && this.config.appId!== null ){
        return new Collection(name,this.config.db)
      }
      else {
        return null
      }
    } catch (error:any) {
      throw new Error(error)
    }
  }


}


type param = {
  _id:string | number;
  [key: string]: any;
}

 class Collection {
  protected name: string;
  protected Db!:Db
  constructor(name:string,db:Db) {
    this.name = name;
    this.Db = db
  }

 async getDocs() {
    const docs = await this.Db.collection(this.name)
    return docs;
  }

  async getDoc(filter: Object) {
    const doc = await this.Db.get(this.name,Object.keys(filter)[0],Object.values(filter)[0]);
    return doc
  }

  async addDoc(doc: param) {
    this.Db.add(this.name,doc)
  }

  async updateDoc(filter:Object,update:Object){
     this.Db.put(this.name,filter,update)
  }

  async deleteDoc(filter:Object){
    this.Db.delete(this.name,Object.keys(filter)[0],Object.values(filter)[0])
  }
}



