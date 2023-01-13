import { useState, useEffect } from "react";
import RegisterIcon from "@mui/icons-material/AccountCircle";
import { Box, TextField, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confimPassword: "",
  });

  const { username, email, password, confimPassword } = formData;
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

    if (password !== confimPassword) {
      toast.error("Passwords do not match");
      console.log("pwd not matching");
    } else {
      const userData = {
        username,
        email,
        password,
      };

      console.log(username, email, password);

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <>
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
          <Typography
            variant="h4"
            padding={3}
            paddingBottom={0}
            textAlign="center"
            fontWeight={"bold"}
          >
            <RegisterIcon sx={{ fontSize: 40 }} /> SIGNUP
          </Typography>
          <Typography variant="body1" padding={2} textAlign="center">
            Please Create an Account
          </Typography>
          <TextField
            placeholder="Username"
            variant="outlined"
            label="username"
            type={"text"}
            margin="normal"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            size="small"
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
          />
          <TextField
            placeholder="Email"
            variant="outlined"
            type={"email"}
            margin="normal"
            label="email"
            size="small"
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
            label="password"
            size="small"
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
          <TextField
            placeholder="Confirm Password"
            variant="outlined"
            type={"password"}
            margin="normal"
            label="confirm password"
            size="small"
            sx={{
              ":hover": {
                boxShadow: "3px 3px 6px #ccc",
              },
            }}
            id="confimPassword"
            name="confimPassword"
            value={confimPassword}
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
            Register
          </Button>
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            component={Link}
            to="/login"
          >
            Change to Login
          </Button>
        </Box>
      </>
    </>
  );
};

export default Register;
