import axios from 'axios';

const API_URL = 'https://i5l.95d.mytemp.website/empnews/backend/api/';

export const getPosts = async (url) => {
  const res = await axios.get(API_URL+url);
  return res.data;
};

export const createPost = async (url,post) => {
  const res = await axios.post(API_URL+url, post, {
    headers: {
      "Content-Type": "multipart/form-data", 
    }
  });
  return res.data;
};

export const updatePost = async (id, post) => {
  const res = await axios.put(`${API_URL}/${id}`, post);
  return res.data;
};

export const deletePost = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
