import { axiosAuth } from '@/api/axiosClientInstance';
import { axiosInstance } from '@/api/axiosInstance';

export const getAllGenres = async () => {
  const res = await axiosInstance.get('/main/genre');
  return res.data;
};

export const getAllGenresCategory = async () => {
  const res = await axiosInstance.get('/category');
  return res.data;
};

export const getAllBooks = async (pageParam: number) => {
  const res = await axiosAuth.get('/api/books', {
    params: {
      page: pageParam,
    },
  });
  return res.data;
};

export const getAllBookQuery = async () => {
  const res = await axiosAuth.get('/api/books');
  return res.data;
};

export const getAuthor = async () => {
  const res = await axiosInstance.get('/main/author');
  return res.data;
};

export const getAuthorBook = async (id: number | string) => {
  const res = await axiosAuth.get(`/api/authors/${id}/books`);
  return res.data;
};

export const getBookDetail = async (id: number | string) => {
  const res = await axiosInstance.get(`/${id}`);
  return res.data;
};

export const getBookBorrow = async () => {
  const res = await axiosAuth.get(`/api/loans/my`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return res.data;
};
