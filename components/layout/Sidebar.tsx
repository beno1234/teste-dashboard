import React from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  PointOfSaleOutlined,
  CalendarMonthOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/router";
import { userType } from "./Navbar";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Blog",
    icon: null,
  },
  {
    text: "Blog",
    icon: <CreateIcon />,
  },
  {
    text: "Noticias",
    icon: <NewspaperIcon />,
  },
  {
    text: "Portfólio",
    icon: null,
  },
  {
    text: "Portfolio",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Ver portfolio",
    icon: <CalendarMonthOutlined />,
  },
];

type sidebarprops = {
  user: userType,
  drawerWidth: string,
  isSidebarOpen: boolean,
  setIsSidebarOpen: (params: boolean) => (void),
  isNonMobile: boolean
}

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}: sidebarprops) => {
  const [active, setActive] = useState("");
  const theme = useTheme();
  const router = useRouter()
  const pathname = router.basePath
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);


  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(true)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.light,
              backgroundColor: theme.palette.background.paper,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    BMOUSE Productions
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        router.push(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.light
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.light,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary.dark 
                              : theme.palette.secondary.light,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};




export default Sidebar
