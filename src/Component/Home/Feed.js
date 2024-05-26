import { Box, CircularProgress, Container } from '@mui/material'
import React  , {useState}from 'react'
import Post from './Post'

function Feed() {

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);  
  }, [1000]);
  return (
    <Box flex={4} p={{ xs: 0, md: 2 }} sx={{display:"flex" , flexDirection:"column",alignItems:"center" , justifyContent:"center"}}>
      {loading ? (
        <Container sx={{display:"flex" , justifyContent:"center", alignItems:"center" ,height:"90vh"}}>
        <CircularProgress />
        </Container>
      ) : (
        <>
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </>
      )}
    </Box>
  )
}

export default Feed