import axios from 'axios';

//change to an environment url eventually
const instance: any = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

instance.defaults.headers.common['Content-Type'] = 'application/json'
instance.defaults.headers.post['Content-Type'] = 'application/json'
instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

const setAuthHeader = (token: string | null) => {
  instance.defaults.headers.common['Authorization'] = token;
}

const setInterceptors = (logoutUser: any, addToast: any = () => {}) => {
  instance.interceptors.response.use((response: any): any => {
    if (response.config) console.info(`[AXIOS]:${response.config.method.toUpperCase()}:${response.config.url}`, {config: response.config, data: response.data});
    return { success: true, status: response.status, data: (response || {}).data }
  }, (error: any) => {
    /** @error.response.data
     * description: "Invalid credentials"
     * error: "Bad Request"
     * status_code: 401
     */
    const resp = error.response || error;
    const data = resp.data || resp;
    console.log('[AXIOS]: Error:', resp);
    if (resp.status === 401) {
      // setAuthHeader(null);
      logoutUser();
      addToast('Relogin required!', { appearance: 'info', autoDismiss: true });
      return new Promise(() => {});
    }
    return Promise.reject({ success: false, status: resp.status, data });
  });
}

export { setAuthHeader, setInterceptors };

instance.origin = axios;
export default instance;
