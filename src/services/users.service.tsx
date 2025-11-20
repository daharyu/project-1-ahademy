import { axiosInstance } from '@/api/axiosInstance';

type LoginUser = {
  email: string;
  password: string;
};

type RegisterUser = {
  name: string;
  email: string;
  password: string;
};

export const LoginUser = async (props: LoginUser) => {
  try {
    const formData = new FormData();
    formData.append('email', props.email);
    formData.append('password', props.password);
    const response = await axiosInstance.post('/login', formData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const RegisterUser = async (props: RegisterUser) => {
  try {
    const formData = new FormData();
    formData.append('name', props.name);
    formData.append('email', props.email);
    formData.append('password', props.password);
    const response = await axiosInstance.post('/register', formData);
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const UpdateUser = async (name: string) => {
  try {
    const response = await axiosInstance.patch(
      '/profile/me',
      { name },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
