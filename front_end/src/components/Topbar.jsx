import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Container,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  styled,
  InputBase,
  Divider,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import Fade from "@mui/material/Fade";

//icons
import SignpostSharpIcon from "@mui/icons-material/SignpostSharp";
import LoginIcon from "@mui/icons-material/Login";
import RegisterIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const pagesLoggedIn = [
  { name: "HOME", link: "/" },
  { name: "ALL CATEGORIES", link: "/categories" },
  { name: "CREATE", link: "/newpost" },
  { name: "MY POSTS", link: "/posts" },
];

const pagesNotLoggedIn = [
  { name: "HOME", link: "/" },
  { name: "ALL CATEGORIES", link: "/categories" },
  { name: "All POSTS", link: "/posts" },
];

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "5px 10px",
  marginRight: "30px",
  borderRadius: theme.shape.borderRadius,
  width: "20%",
}));

const Topbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SignpostSharpIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MBLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} key={"homeMI"}>
                <Typography
                  textAlign="center"
                  component={Link}
                  to={"/"}
                  sx={{ textDecoration: "none" }}
                >
                  HOME
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} key={"categoriesMI"}>
                <Typography
                  textAlign="center"
                  component={Link}
                  to={"/categories"}
                  sx={{ textDecoration: "none" }}
                >
                  ALL CATEGORIES
                </Typography>
              </MenuItem>
              {user ? (
                <div>
                  <MenuItem onClick={handleCloseNavMenu} key={"createMI"}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/create"}
                      sx={{ textDecoration: "none" }}
                    >
                      CREATE
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu} key={"mypostsMI"}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/myposts"}
                      sx={{ textDecoration: "none" }}
                    >
                      MY POSTS
                    </Typography>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleCloseNavMenu} key={"allposts"}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/posts"}
                      sx={{ textDecoration: "none" }}
                    >
                      ALL POSTS
                    </Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
          <SignpostSharpIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MBLOG
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user
              ? pagesLoggedIn.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    to={page.link}
                  >
                    {page.name}
                  </Button>
                ))
              : pagesNotLoggedIn.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                    component={Link}
                    to={page.link}
                  >
                    {page.name}
                  </Button>
                ))}
          </Box>

          <Search>
            <InputBase placeholder="search..." />
          </Search>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {user ? (
                  <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
                ) : (
                  <Avatar>U</Avatar>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              TransitionComponent={Fade}
            >
              {user ? (
                <div>
                  <MenuItem
                    key={"username"}
                    onClick={handleCloseUserMenu}
                    sx={{ alignItems: "center" }}
                  >
                    <Typography align="center">{user.username}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                    <Button
                      component={Link}
                      to="/profile"
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      startIcon={<RegisterIcon />}
                      color="inherit"
                    >
                      Profile
                    </Button>
                  </MenuItem>
                  <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                    <Button
                      sx={{ marginLeft: "auto" }}
                      variant="outlined"
                      startIcon={<LogoutIcon />}
                      color="inherit"
                      onClick={onLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem key={"login"} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/login"}
                      sx={{ textDecoration: "none" }}
                    >
                      <LoginIcon /> Login
                    </Typography>
                  </MenuItem>
                  <MenuItem key={"register"} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={"/register"}
                      sx={{ textDecoration: "none" }}
                    >
                      <RegisterIcon />
                      Register
                    </Typography>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Topbar;
