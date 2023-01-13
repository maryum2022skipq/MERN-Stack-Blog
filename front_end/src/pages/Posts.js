import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import Post from "../components/Post";

//get all posts from store
//if user is signed in, separate my posts

const Posts = ({ posts }) => {
  return (
    <Box>
      <Post />
    </Box>
  );
};

export default Posts;
