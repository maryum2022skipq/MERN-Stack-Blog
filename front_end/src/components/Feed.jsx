import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
const Feed = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.feed.main} flex={4} p={2}>
      Feed
    </Box>
  );
};

export default Feed;
