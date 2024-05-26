import { Box, Stack, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import RightBar from "./RightBar"
import Feed from "./Feed"
import MiniDrawer from './SideBar'
import { useRecoilValue } from 'recoil'
import { drawerState } from '../../GlobalState'


function Home() {

  const theme = useTheme();
  const isSMOrSmaller = useMediaQuery(theme.breakpoints.down('sm'));
  const isSideBarOpen = useRecoilValue(drawerState);
  return (
    <Box >
    <Box sx={{display:"flex" , position:"relative"}}>
        <MiniDrawer />
        <Box sx={{ display: isSMOrSmaller && isSideBarOpen && "none" }}>
      <Feed />
      <RightBar /> 
        </Box>
    </Box>
   </Box>
  )
}

export default Home;