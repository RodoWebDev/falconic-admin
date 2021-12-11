import React, { useState } from 'react';
import { useLocalStorage } from 'hooks';
import { setInterceptors, setAuthHeader } from 'utils/axios';
import api from 'utils/api';

const LoginContext = React.createContext({
  user: null,
  pagesLoading: false,
  currentPage: '',
  pages: [],
  tabs: [],
  sections: [],
  currencies: [],
  currenciesList: [],
  getSections: async () => {},
  setCurrentPage: (data: string) => {},
  getPages: async () => {},
  getDefaultCurrencies: async () => {},
  updateTab: async (data: any) => {},
  updateCurrency: async (data: any) => {},
  updateTabItem: async (data: any) => {},
  removeTabItem: async (data: any) => {},
  updateSection: async (data: any) => {},
  removeSection: async (id: any) => {},
  addPage: async (pageTitle: string) => {},
  login: async (email: string, password: string) => {},
  register: async (firstName: string, lastName: string, email: string, password: string) => {},
  logout: () => {}
});
export { LoginContext };

const LoginContextContainer = (props: any) => {
  /* eslint-disable-next-line */
  const [accessToken, setAccessToken] = useLocalStorage('access-token', undefined, (token: string | null) => setAuthHeader(`Barear ${token}`));
  const [user, setUser] = useLocalStorage('user', undefined);
  const [pages, setPages] = useState([]);
  const [sections, setSections] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [currenciesList, setCurrenciesList] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  /**
   * @return An error object or `undefined` if suceed
   */
  const getPages = async (): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.getPages();
      if (result.success) {
        setPages(result.data);
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const getDefaultCurrencies = async (): Promise<any> => {
    try {
      var requestURL = 'https://api.exchangerate.host/latest';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();

      request.onload = function() {
        var response = request.response;
        const rates: any = Object.keys(response.rates);
        setCurrenciesList(rates);
      }
      // axios.get(`https://api.exchangerate.host/latest`)
      // .then(res => {
      //   console.log('res =>', res)
      // })
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const getSections = async (): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.getSections(currentPage);
      if (result.success) {
        setSections(result.data.sections);
        setTabs(result.data.tabs);
        setCurrencies(result.data.currencies);
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const addPage = async (pageTitle: string): Promise<any> => {
    setPagesLoading(true);
    try{ 
      const result = await api.addPage(pageTitle);
      if (result.success) {
        getPages();
      }
      setPagesLoading(false);
    } catch (err) {
      setPagesLoading(false);
      return err;
    }
  }

  const loginUser = async (email: string, password: string): Promise<any> => {
    if (!email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.loginUser({ email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const registerUser = async (firstName: string, lastName: string, email: string, password: string): Promise<any> => {
    if (!firstName || !lastName || !email || !password) return 'Email or password is empty';
    try{ 
      const result = await api.registerUser({ firstName, lastName, email, password });
      const token = result.data.data.token.access_token;
      if(token) {
        setAccessToken(token);
        setUser(result.data.data.user);
        return 'Success';
      } else {
        return 'There was a problem with login';
      }
    } catch (err) {
      return err;
    }
  }

  const removeSection = async (id: any): Promise<any> => {
    try { 
      const result = await api.removeSection(id);
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const updateTab = async (data: any): Promise<any> => {
    try { 
      const result = await api.addTab({...data, page: currentPage});
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const updateTabItem = async (data: any): Promise<any> => {
    const form = new FormData();
    form.append("id", data.id);
    form.append("type", data.type);
    form.append("title", data.title);
    form.append("btnTitle", data.btnTitle);
    form.append("img", data.img);
    try { 
      const result = await api.addTabItem(form);
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const removeTabItem = async (data: any): Promise<any> => {
    try { 
      const result = await api.removeTabItem(data);
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const updateCurrency = async (data: any): Promise<any> => {
    try { 
      const result = await api.updateCurrency({...data, items: JSON.stringify(data.items)});
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const updateSection = async (data: any): Promise<any> => {
    const form = new FormData();
    form.append("page", currentPage);
    form.append("type", data.type);
    form.append("videoUrl", data.videoUrl);
    form.append("title", data.title);
    form.append("desc", data.desc);
    form.append("btnTitle", data.btnTitle);
    form.append("slider", JSON.stringify(data.slider));
    form.append("list", JSON.stringify(data.list));
    form.append("img", data.img);
    try { 
      const result = await api.addSection(form);
      if (result.success) {
        getSections();
      }
    } catch (err) {
      return err;
    }
  }

  const logoutUser = () => {
    setUser(undefined);
    setAccessToken(undefined);
  }

  setInterceptors(logoutUser);

  return (
    <LoginContext.Provider
      value={{
        user,
        pagesLoading,
        pages,
        tabs,
        sections,
        currencies,
        currenciesList,
        currentPage,
        login: loginUser,
        logout: logoutUser,
        register: registerUser,
        getPages,
        getDefaultCurrencies,
        getSections,
        addPage,
        updateTab,
        updateTabItem,
        removeTabItem,
        updateCurrency,
        updateSection,
        setCurrentPage,
        removeSection
      }}
    >
      { props.children }
    </LoginContext.Provider>
  )
}

export default LoginContextContainer;
