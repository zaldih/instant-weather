const axios = require('axios').default;

export class HttpService {
  get(url: string): Promise<any> {
    return axios.get(url);
  }
}
