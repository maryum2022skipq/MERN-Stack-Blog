import { useEffect, useState } from "react";
import {
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import defaultPostBackground from "../assets/default_slider_image_1.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RichTextEditor from "../components/RichTextEditor";
import axios from "axios";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createPost, reset } from "../features/posts/postSlice";
import Spinner from "../components/Spinner";
const API_URL = "http://localhost:5000/api";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleImage, setTitleImage] = useState(null);
  const [summary, setSummary] = useState("");
  const [categories, setCategories] = useState([]);

  const [allCategories, setAllCategories] = useState([]);

  const { isLoading, isSuccess, isError, message, posts } = useSelector(
    (state) => state.posts
  );

  const { user } = useSelector((state) => state.auth);
  const theme = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      console.log(posts.at(-1)._id);
      navigate(`/${posts.at(-1)._id}`);
    }

    dispatch(reset());
  }, [posts, isError, isSuccess, message, navigate, dispatch]);

  //handle categories selected by user
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //get all categories from api
  useEffect(() => {
    try {
      const fetchCategories = async () => {
        const res = await axios.get(API_URL + "/categories");

        const cats = res.data.map((cat) => {
          return cat.name;
        });

        setAllCategories(cats);
      };
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //set file selected as title image
  const onFileSelected = (event) => {
    event.preventDefault();
    setTitleImage(event.target.files[0]);
  };

  //when create button is pressed
  const onSubmit = async (e) => {
    e.preventDefault();

    const postData = { title, summary, content, categories };

    if (titleImage) {
      const imageName = Date.now() + titleImage.name;

      let formData = new FormData();
      formData.append("name", imageName);
      formData.append("file", titleImage);
      await axios({
        method: "post",
        url: API_URL + "/upload",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      postData.titleImage = imageName;
    }

    console.log(postData);

    dispatch(createPost(postData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    navigate("/");
  }

  return (
    <Paper
      component="form"
      elevation={3}
      sx={{ width: "90%", margin: "auto", padding: "20px 10px" }}
    >
      <Card
        raised
        sx={{
          margin: "0 auto",
          padding: "0.1em",
        }}
      >
        <Tooltip title="Upload Background Image">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={onFileSelected}
            />
            <PhotoCamera />
          </IconButton>
        </Tooltip>

        <CardHeader title={title ? title : "Create New Post..."} />
        <CardMedia
          component="img"
          height="400"
          width="100%"
          image={
            titleImage ? URL.createObjectURL(titleImage) : defaultPostBackground
          }
          alt={title}
          sx={{ padding: "1em 1em 0 1em", objectFit: "filled" }}
        />
        <CardContent>
          <Box component="span">
            <Tooltip title="Create New Categories">
              <IconButton
                color="primary"
                aria-label="create-categories"
                component="label"
                onClick={(e) => {
                  console.log(e);
                }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <FormControl variant="standard" sx={{ m: 1 }} required fullWidth>
              <InputLabel id="categories-label" variant="outlined">
                Categories
              </InputLabel>
              <Select
                labelId="categories-label"
                label="Categories"
                id="categories-chip"
                multiple
                value={categories}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {allCategories.map((category, i) => (
                  <MenuItem
                    key={`${category}_${i}`}
                    value={category}
                    style={getStyles(category, categories, theme)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            required
            style={{ margin: 8 }}
            height="10%"
            fullWidth
            margin="normal"
            placeholder="Post Title..."
            variant="outlined"
            type={"text"}
            id="title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            size="large"
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
          />
          <TextField
            required
            style={{ margin: 8 }}
            fullWidth
            margin="normal"
            placeholder="Post Summary..."
            variant="outlined"
            type={"text"}
            id="summary"
            name="summary"
            value={summary}
            onChange={(e) => {
              setSummary(e.target.value);
            }}
            size="large"
            multiline
            maxRows={4}
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
          />
          <Box style={{ margin: 8 }} margin="normal" width="100%">
            <RichTextEditor setContent={setContent} />
          </Box>
        </CardContent>
        <CardActions>
          <Button
            startIcon={<AddIcon />}
            sx={{ width: "100%" }}
            onClick={onSubmit}
          >
            Create Post
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default NewPost;
