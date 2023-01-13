import { useEffect, useState } from "react";
import {
  Paper,
  IconButton,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Popover,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import axios from "axios";
import defaultPostBackground from "../assets/default_slider_image.png";
const API_URL = "http://localhost:5000/api";

const SliderItem = (props) => {
  const [postDate, setPostDate] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const myDate = new Date(props.post.createdAt);

    setPostDate(`${myDate.toDateString()}`);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(API_URL + "/users/" + props.post.user);
      console.log(res.data);
      console.log(res.data.username.charAt(0).toUpperCase());
      setAuthor(res.data);
    };
    fetchUser();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Paper elevation={3}>
      <Card>
        <CardHeader
          avatar={
            author.profilePicture ? (
              author.profilePicture
            ) : (
              <Avatar sx={{ bgcolor: red[500] }}>
                {author ? `${author.username.charAt(0).toUpperCase()}` : "U"}
              </Avatar>
            )
          }
          title={props.post.title}
          subheader={`Created At: ${postDate}`}
          titleTypographyProps={"h4"}
          subheaderTypographyProps={"body1"}
        />
        <CardMedia
          component="img"
          height="400"
          width="100%"
          image={
            props.post.titleImage
              ? props.post.titleImage
              : defaultPostBackground
          }
          alt={props.post.summary ? props.post.summary : ""}
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Author: {author.username ? author.username : ""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.post.summary ? props.post.summary : ""}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton aria-label="share">
            <FavoriteIcon />
          </IconButton>
          <Button
            aria-describedby={id}
            variant="contained"
            startIcon={<ShareIcon />}
            onClick={handleClick}
          >
            Share
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography
              sx={{ p: 2 }}
            >{`Copy URL: http://localhost:3000/${props.post._id}`}</Typography>
          </Popover>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default SliderItem;
