import React, { useState } from "react";
import { Box, ThemeProvider, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
/* import Navbar from "components/Navbar"; */
import Sidebar from "./Sidebar";
import Navbar, { userType } from "./Navbar";
import { RootState } from "../../redux/reducers";
import { themeSettings } from "../../styles/theme";



const Layout = ({ children }: {children: React.ReactNode} ) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const data: userType = {
        name: "beno",
        occupation: "atrapalhado"
    }
    const themeMode = useSelector((state: RootState) => {return state.theme.mode})

  
  return (
    <>
      <ThemeProvider theme={themeSettings(themeMode)}>
    
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {children}
      </Box>
    </Box>
        </ThemeProvider>
    </>
  );
};

export default Layout;
