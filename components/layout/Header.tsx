import { Typography, Box, useTheme } from "@mui/material";
import React from "react";

type HeaderType = {
    title: string,
    subtitle: string,
}

const Header = ({ title, subtitle }: HeaderType) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary.main}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary.main}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
