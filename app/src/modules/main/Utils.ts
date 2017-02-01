import {Chrome} from '../helpers/Chrome';

const chrome = Chrome.getInstance();

export class Utils {
  constructor () {
  }

  request (options: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(options.method, options.url);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.response));
          } catch (err) {
            reject('Invalid JSON');
          }
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      };
      if (options.headers) {
        Object.keys(options.headers).forEach(function (key) {
          xhr.setRequestHeader(key, options.headers[key]);
        });
      }
      let params = options.params;
      if (params && typeof params === 'object') {
        params = Object.keys(params).map(function (key) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
      }
      xhr.send(params);
    })
  }

  getRandomFromRange (topValue: number): number {
    return Math.floor(Math.random() * topValue)
  }

  dispatch (action, data?) {
    chrome.runtime.sendMessage({action, data})
  }
}
