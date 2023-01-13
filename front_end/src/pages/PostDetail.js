import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const PostDetail = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  //if user is the author of the post, display show sign
  useEffect(() => {
    if (!user) {
    }
  }, [user, navigate]);

  return <div>PostDetail</div>;
};

export default PostDetail;
