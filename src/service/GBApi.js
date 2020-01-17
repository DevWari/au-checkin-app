import Cache from "../utils/cache";
import * as config from "../config";

const GBApi = {
  async baseApi(sub_url, method, json_data, cb) {
    try {
      let request = {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": Cache.currentUser
            ? "bearer " + Cache.currentUser['access_token']
            : null,
        }
      };
      if (method == "POST" || method == "PUT") {
        request["body"] = JSON.stringify(json_data);
      }
      console.log(config.SERVICE_API_URL + sub_url, request)
      let response = await fetch(config.SERVICE_API_URL + sub_url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      cb(error);
    }
  },

  async init(cb) {
    try {
      
      cb(null)
    } catch (err) {
      cb(err)
    }

  },

  isLoggedIn() {
    return Cache.currentUser != null;
  },

  login(email, password, cb) {
    this.baseApi('/api/auth/login', 'POST', { appCode, password}, (err, res) => {
      if (err == null) {
        Cache.currentUser = res
        Cache.currentUser.user.password = password        
      }
      cb(err, res)
    })
  },

  logout() {
    Cache.currentUser = null;    
  },

  signup(data, cb) {
    this.baseApi('/api/signup', 'POST', data, (err, res) => {
      cb(err, res)
    })
  },

     
  getProjects(cb) {
    this.baseApi('/api/projects', 'GET', {}, cb)
  },
  setProjects(data, cb) {
    this.baseApi('/api/projects', 'POST', data, cb)
  }, 
};
export default GBApi;