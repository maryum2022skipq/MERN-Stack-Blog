import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const theme = useTheme();
  const API_URL = "http://localhost:5000/api";

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(API_URL + "/categories");
      console.log("categories");
      console.log(res.data);
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <Box
      bgcolor={theme.palette.sidebar.main}
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <List
        subheader={
          <ListSubheader
            component="h2"
            id="nested-list-subheader"
            sx={{
              fontSize: "30px",
              backgroundColor: `${theme.palette.sidebar.main}`,
              fontWeight: "bold",
            }}
          >
            CATEGORIES
          </ListSubheader>
        }
      >
        {categories.map((category, i) => (
          <ListItem
            disablePadding
            sx={{
              backgroundColor: `${theme.palette.sidebar.main}`,
            }}
            key={`${i}_${category.name}`}
          >
            <ListItemButton>
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{
                  fontSize: "25px",
                  fontWeight: "medium",
                }}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {category.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
