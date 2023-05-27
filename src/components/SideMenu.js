import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '240px',
    backgroundColor: '#BCDBD6',
  },
  listItem: {
    paddingLeft: theme.spacing(2),
    borderRadius: '50px',
    padding: '10px 20px',
    margin: '10px 0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
}));

function SideMenu() {
  const classes = useStyles();

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', backgroundColor: 'black' }}>
      <div style={{ width: '10%', height: '100%', backgroundColor: 'red' }}>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{
            paper: classes.drawer,
          }}
        >
            <List>
                <ListItem button className={classes.listItem} >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Chat" />
                </ListItem>
                </List>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
             
              height: '50%',
              marginTop: 230,
            }}
          >
            <CardContent>
              <h1>Templates</h1>
              <List>
                <ListItem button className={classes.listItem} >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Chat" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Templates" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add New" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Drawer>
      </div>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '85%', height: '100%', marginLeft: '5%', backgroundColor: 'white' }}>
          <Outlet />
        </div>
        <div style={{ width: '17%', height: '100%' }}>
        <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
             
              height: '50%',
              marginTop: 230,
            }}
          >
            <CardContent>
              <h1>Templates</h1>
              <List>
                <ListItem button className={classes.listItem} >
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary="New Chat" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Templates" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add New" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
