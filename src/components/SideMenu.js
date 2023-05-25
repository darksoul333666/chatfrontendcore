import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '240px',
    backgroundColor:'#BCDBD6',
  },
  listItem: {
    paddingLeft: theme.spacing(2),
  },
}));

function SideMenu() {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row" }}>
      <div style={{ width: 200, height: "100%", backgroundColor:'red' }}>
        <Drawer
          variant="permanent"
          anchor="left"
          className={classes.drawer}
          classes={{
            paper: classes.drawer,
          }}
        >
          <List>
            <ListItem button className={classes.listItem}>
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
        </Drawer>
      </div>
      <div style={{ width: "85%", height: "100%", marginLeft:'10%',  backgroundColor: "white" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default SideMenu;
