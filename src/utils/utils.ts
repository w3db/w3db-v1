import axios, { AxiosInstance } from "axios";
import CryptoJS from "crypto-js";

type config = {
  secret: string;
  appId: string;
  address: string;
  admin: {
    name: string;
    pass: string;
  };
  gateway: string;
  url: string;
};

type requests =
  | "getdoc"
  | "adddoc"
  | "updatedoc"
  | "deletedoc"
  | "getdocs"
  | "getipfs" 
  |"deletecollection";

type Response = [string, boolean];

export class Db {
  protected config: config = {} as config;
  protected agent!: AxiosInstance;
  constructor(config: config) {
    this.config = config;
    this.agent = axios.create({
      baseURL: config.gateway,
      headers: {
        origin: this.config.url,
        Accept: "application/json",
        secret: this.config.secret,
      },
    });
  }

  private getPath(type: requests, collection?: string) {
    switch (type) {
      case "getdoc":
        return {
          path: `/${this.config.address}/${this.config.appId}/${collection}?adminName=${this.config.admin.name}&adminPass=${this.config.admin.pass}&secret=${this.config.secret}&`,
          body: null,
        };
      case "adddoc":
        return {
          path: `/${this.config.address}/${this.config.appId}/${collection}`,
          body: {
            adminName: this.config.admin.name,
            adminPass: this.config.admin.pass,
            secret: this.config.secret,
          },
        };
      case "updatedoc":
        return {
          path: `/${this.config.address}/${this.config.appId}/${collection}`,
          body: {
            adminName: this.config.admin.name,
            adminPass: this.config.admin.pass,
            secret: this.config.secret,
          },
        };
      case "deletedoc":
        return {
          path: `/${this.config.address}/${this.config.appId}/${collection}?adminName=${this.config.admin.name}&adminPass=${this.config.admin.pass}&secret=${this.config.secret}&`,
          body: null,
        };
      case "getdocs":
        return {
          path: `/${this.config.address}/${this.config.appId}?adminName=${this.config.admin.name}&adminPass=${this.config.admin.pass}&secret=${this.config.secret}&collection=${collection}`,
          body: null,
        };
      case "getipfs":
        return {
          path: `/${this.config.address}/ipfs?adminName=${this.config.admin.name}&adminPass=${this.config.admin.pass}&appId=${this.config.appId}&secret=${this.config.secret}`,
          body: null,
        };
      case "deletecollection":
        return {
          path:`/${this.config.address}/${this.config.appId}?adminName=${this.config.admin.name}&adminPass=${this.config.admin.pass}&secret=${this.config.secret}&collection=${collection}`,
          body:null
        }  
    }
  }

  async add(collection: string, doc: any): Promise<any> {
    try {
      let status = false;
      const config = this.getPath("adddoc", collection);
      const res = await this.agent.post(config.path, {
        ...config.body,
        doc,
      });
      if (res.data.error) {
        status = false
        throw new Error(res.data.error);
      }
      else {
        status = true
      }
      return status;
    } catch (error: any) {
      console.clear();
    }
  }

  async get(collection: string, filter: string, value: string): Promise<any> {
    try {
      const config = this.getPath("getdoc", collection);
      const res = await this.agent.get(
        `${config.path}filter=${filter}&value=${value}`
      );
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        const data = await res.data;
        return data;
      }
    } catch (error: any) {
      console.clear();
    }
  }

  async put(collection: string, filter: Object, update: Object): Promise<any> {
    try {
      let status = false;
      const config = this.getPath("updatedoc", collection);
      const res = await this.agent.put(config.path, {
        ...config.body,
        filter,
        update,
      });
      if (res.data.error) {
        status = false;
        throw new Error(res.data.error);
      }
      else {
        status = true
      }
      return status
    } catch (error: any) {
      console.clear();
    }
  }
  async delete(
    collection: string,
    filter: string,
    value: string
  ): Promise<any> {
    try {
      let status = false;
      const config = this.getPath("deletedoc", collection);
      const res = await this.agent.delete(
        `${config.path}filter=${filter}&value=${value}`
      );
      if (res.data.error) {
        status = false;
        throw new Error(res.data.error);
      }
      else {
        status = true
      }
      return status
    } catch (error: any) {
      console.clear();
    }
  }

  async collection(collection: string): Promise<any> {
    try {
      const config = this.getPath("getdocs", collection);
      const res = await this.agent.get(config.path);
      if (res.data.error) {
        throw new Error(res.data.error);
      } else {
        const data = await res.data;
        return data;
      }
    } catch (error: any) {
      console.clear();
    }
  }

  async removeCollection(collection:string){
    try {
      let status = false;
      const config = this.getPath("deletecollection", collection);
      const res = await this.agent.delete(config.path);
      if (res.data.error) {
        status = false
        throw new Error(res.data.error);
      }
      else {
        status = true
      }
      return status
    } catch (error: any) {
      console.clear();
    }
  }
  
  async getHash(gateway:boolean){
    try {
        const config = this.getPath("getipfs");
        const res = await this.agent.get(config.path);
        if (res.data.error) {
          throw new Error(res.data.error);
        } else {
          const data = await res.data;
          if(data !== ""){
            if(gateway){
                return data;
              }
              else {
                const hash = data.slice(data.length - 46,data.length);
                return hash;
              }
          }
          else {
            throw new Error("Your DB is empty")
          }
        }
      } catch (error: any) {
        console.clear();
      }
  }

}


export function encrypt(data: string, key: string) {
  var encrypted = CryptoJS.AES.encrypt(data, key).toString();
  return encrypted;
}

export function decrypt(encrypted: string | any, key: string) {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}
