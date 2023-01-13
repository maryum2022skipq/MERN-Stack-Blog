import { useState, useEffect } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { Box, TextField, Typography, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={600}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            <LoginIcon sx={{ fontSize: 60 }} /> Sign In
          </Typography>
          <Typography variant="h5" padding={2} textAlign="center">
            Please Login to Continue
          </Typography>

          <TextField
            placeholder="Email"
            variant="outlined"
            type={"email"}
            margin="normal"
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
            id="email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <TextField
            placeholder="Password"
            variant="outlined"
            type={"password"}
            margin="normal"
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
            id="password"
            name="password"
            value={password}
            onChange={onChange}
          />

          <Button
            variant="contained"
            sx={{
              ":hover": {
                boxShadow: "5px 5px 10px #ccc",
              },
              marginTop: 3,
              borderRadius: 3,
            }}
            onClick={onSubmit}
          >
            Login
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            component={Link}
            to="/register"
          >
            Change to Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
