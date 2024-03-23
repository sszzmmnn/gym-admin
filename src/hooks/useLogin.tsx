import { AxiosError } from 'axios';
import useAuth from './useAuth';
import axios from '../api/axios';

interface ILoginRes {
  success: boolean,
  message: string
}

const useLogin = () => {
  const { setAuth } = useAuth();
  const login = async (email: string, password: string): Promise<ILoginRes> => {
    try {
      console.log({email, password});
      const response = await axios.post('/admin/login',
        {email, password}
      );

      localStorage.setItem('auth', JSON.stringify(response.data));
      setAuth(() => {console.log(response.data); return response.data});
      return {success: true, message: ''};
    } catch(err) {
      if(err instanceof AxiosError) {
        console.log(err.response?.data?.error);
        return {success: false, message: err.response?.data?.error};
      }
      return {success: false, message: 'Failed to log in'};
    }
  }

  return login;
}

export default useLogin
