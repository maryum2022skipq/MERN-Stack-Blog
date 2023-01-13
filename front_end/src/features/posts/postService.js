import axios from "axios";

const API_URL = "http://localhost:5000/api/posts/";

//create new post
const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

//get all posts
const getPosts = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

const postService = { createPost, getPosts };

export default postService;
