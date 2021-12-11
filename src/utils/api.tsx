import instance, { setAuthHeader } from './axios';
const baseUrl = process.env.REACT_APP_URL;

const api = {
  getPages: async () => {
    const result = await instance.get(`${baseUrl}/cms/pages`)
    if (result.data.data && result.data.data.success) {
      return result.data.data;
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  getDefaultCurrencies: async () => {
    const result = await instance.get(`https://api.exchangerate.host/latest?base=USD`)
    if (result.data.data && result.data.data.success) {
      return result.data.data;
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  getSections: async (currentPage: string) => {
    const result = await instance.get(`${baseUrl}/cms/page/${currentPage}`);
    if (result.data.data && result.data.data.success) {
      return result.data.data;
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addPage: async (pageTitle: string) => {
    const result = await instance.post(`${baseUrl}/cms/page`, {
      pageTitle: pageTitle
    })
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  removeSection: async (id: any) => {
    const result = await instance.delete(`${baseUrl}/cms/section/${id}`);
    if (result.data.data === 'deleted') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addTab: async (data: FormData) => {
    const headers = {
      "Content-Type": "form-data"
    };
    const result = await instance.post(`${baseUrl}/cms/tab`, data, headers);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  updateCurrency: async (data: FormData) => {
    const result = await instance.post(`${baseUrl}/cms/currency`, data);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addTabItem: async (data: FormData) => {
    const headers = {
      "Content-Type": "form-data"
    };
    const result = await instance.post(`${baseUrl}/cms/tab/item`, data, headers);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  removeTabItem: async (data: any) => {
    const result = await instance.delete(`${baseUrl}/cms/tab/item/${data.type}/${data.id}`);
    if (result.data.data === 'deleted') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  addSection: async (data: FormData) => {
    const headers = {
      "Content-Type": "form-data"
    };
    const result = await instance.post(`${baseUrl}/cms/section`, data, headers);
    if (result.data.data === 'added') {
      return {
        success: true,
        message: ''
      };
    } else {
      return {
        success: false,
        message: result.data.message
      };
    }
  },
  loginUser: async (user_data: any) => {
    const result = await instance.post(`${baseUrl}/auth/admin/login`, {
      email: user_data.email,
      password: user_data.password
    })
    const data = result.data.data;
    if (data && data.token.access_token !== undefined) {
      setAuthHeader(`Bearer ${data.token.access_token}`)
      // track('Successful login')
    } else {
      // track('Unsuccessful login');
    }
    return result;
  },
  registerUser: async (user_data: any) => {
    const result = await instance.post(`${baseUrl}/auth/admin/register`, {
      firstName: user_data.firstName,
      lastName: user_data.lastName,
      email: user_data.email,
      password: user_data.password
    })
    const data = result.data.data;
    if (data && data.token.access_token !== undefined) {
      setAuthHeader(`Bearer ${data.token.access_token}`)
    }
    return result;
  },
}

export default api;
