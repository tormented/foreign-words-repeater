import {Utils} from './Utils';

const utils = new Utils();

export class Config {
  private data: Object;
  private static instance = new Config();

  constructor () {
  }

  init (): Promise<any> {
    return utils.request({
      method: "GET",
      url: '/config.json'
    })
      .then(data => {
        this.data = data;
        return Promise.resolve();
      });
  }

  public static getInstance () {
    return this.instance;
  }

  getData (key) {
    return this.data && this.data[key]
  }

  setData(key, data){
    this.data[key] = data;
  }
}
