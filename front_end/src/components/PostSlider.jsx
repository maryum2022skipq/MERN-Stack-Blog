import { useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import SliderItem from "./SliderItem";
const PostSlider = ({ posts }) => {
  useEffect(() => {
    console.log(posts);

    return () => {};
  }, []);

  return (
    <Carousel>
      {posts.map((post, i) => (
        <SliderItem key={i} post={post} />
      ))}
    </Carousel>
  );
};

export default PostSlider;
