import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from "react-router-dom"

function Navbar() {
  const [open, setOpen] = React.useState(false);

  // Toggle drawer
  const toggleDrawer = (openState) => {
    setOpen(openState);
  };

  return (
    <div>
      {/* Main AppBar */}
      <AppBar position="static">
        <Toolbar>
          {/* Left side: Logo */}
          
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/"  style={{ textDecoration: "none" }}> 
          <Button sx={{ color: "white", "&:hover": { color: "white" } }}> Book </Button>  </Link>
          </Typography>
         
          
          {/* Desktop: Navbar Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          
          <Link to="/" style={{ textDecoration: "none" }}> 
<Button color="inherit" sx={{ color: "white", "&:hover": { color: "white" } }} >Home</Button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button color="inherit" sx={{ color: "white", "&:hover": { color: "white" } }} >
               Signup
                </Button>
                </Link>
            {/* <Button color="inherit"></Button>
            <Button color="inherit"></Button> */}
          </Box>

          {/* Mobile: Hamburger Menu */}
          <IconButton color="inherit" edge="end" onClick={() => toggleDrawer(true)} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <List>
          <ListItem button>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Signup" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbar;