import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import { Box, Stack } from "@mui/material";
import PostSlider from "../components/PostSlider";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { getPosts, reset } from "../features/posts/postSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [topPosts, setTopPosts] = useState([]);
  const { isLoading, isError, message, posts } = useSelector(
    (state) => state.posts
  );

  //if user is the author of the post, display show sign
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getPosts());

    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    console.log(posts);
    if (posts) {
      console.log("line 29: if ran");
      const sorted = [...posts].sort(function (a, b) {
        return parseFloat(b.likes.length) - parseFloat(a.likes.length);
      });
      if (sorted.length > 3) {
        //select only the most featured posts
        const slicedArray = sorted.slice(0, 3);
        console.log(slicedArray);
        setTopPosts(slicedArray);
      } else {
        //show all available posts as featured
        setTopPosts(sorted);
        console.log(sorted);
      }
    } else {
      console.log("line 44: if didnt run");
    }
    return () => {};
  }, [posts]);

  if (isLoading) {
    <Spinner />;
  }

  return (
    <Box>
      <PostSlider posts={topPosts} />
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        padding={2}
      >
        <Feed />
        <Sidebar />
      </Stack>
    </Box>
  );
};

export default Home;
