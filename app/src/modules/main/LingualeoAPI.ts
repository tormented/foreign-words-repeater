import {Utils} from './Utils';
import {Config} from './Config'

const utils = new Utils();

export class LingualeoAPI {
  private config = Config.getInstance().getData('lingualeo');

  constructor () {
  }

  public login (credentials): Promise<any> {
    return utils.request({
      method: 'POST',
      url: this.config.baseUrl + this.config.routes.login,
      params: credentials
    })
      .then(data => {
        if(data['error_msg'] && data['error_code']){
          return Promise.reject(data);
        }else{
          return Promise.resolve(data['user']);
        }
      })
  }

  public isAuth (): Promise<any> {
    return utils.request({
      method: 'POST',
      url: this.config.baseUrl + this.config.routes.isAuth,
    });
  }

  public getWords(page:number): Promise<any> {
    return utils.request({
      method: 'GET',
      url: this.config.baseUrl + this.config.routes.getUserGlossary + '?page=' + page
    });
  }

}
