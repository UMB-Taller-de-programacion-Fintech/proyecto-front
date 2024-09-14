import configService from "services/config.service";
import { useAppDispatch } from "store"
import tokenAction from "store/auth/token/token.action";
import CustomAxios from "utility/customAxios";


class LoginService {
  async login(email: string, password: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/users/login", data: { email, password }})
      return response?.data;
    } catch (error: any) {
      return error?.response?.data
    }
  }

  async loginWithGoogle(email: string): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/auth/login-google", data: { email, name }})
      return response?.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async logout(): Promise<void> {
    const dispatch = useAppDispatch();
    dispatch(tokenAction.drop())
    return
  }

  async register(_params: any): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'POST', url: configService.host +"/users/create", data: _params})
      return response?.data;
    } catch (error: any) {
      return error?.response?.data
    }
  }

  async getUsers(_params: any): Promise<any> {
    try {
      const response = await CustomAxios( {method: 'GET', url: configService.host +"/users", data: _params})
      console.log(response?.data);
      return response?.data;
    } catch (error: any) {
      return error?.response?.data
    }
  }
}

const loginService = new LoginService();
export default loginService;