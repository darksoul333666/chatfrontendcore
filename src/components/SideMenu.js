import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Personalities, Templates } from '../config/Templates';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: '240px',
    backgroundColor: '#BCDBD6',
  },
  listItem: {
    // paddingLeft: theme.spacing(2),
    borderRadius: '50px',
    padding: '10px 20px',
    margin: '10px 0',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
  },
}));

const styles = {
  parentContainer: {
    display: 'flex',
    width:'100%',
    height: '100vh', /* Ocupar todo el alto de la pantalla */
  },
  child1: {
    flexBasis: '15%',
    backgroundColor: '#f0f0f0',
  },
  child2: {
    flexBasis: '70%',
    backgroundColor: '#e0e0e0',
    overflowY: 'auto', /* Permitir scroll vertical si es necesario */
  },
  child3: {
    flexBasis: '15%',
    backgroundColor: '#f0f0f0',
  },
};

const RenderTemplatesMenu = () => {
  const templates = Object.values(Templates)
  const classes = useStyles()
  return (
    <div style={{overflow:'scroll'}} >
          {templates.map( template => 
              <ListItem button className={classes.listItem} >
              <ListItemText primary={template.title} />
              <ListItemIcon>
              {template.avatar()}
              </ListItemIcon>
            </ListItem>
            )}
    </div>
  )
}

const RenderPersonalitiesMenu = () => {
  const personalities = Object.values(Personalities)
  const classes = useStyles()
  return (
    <div style={{overflow:'scroll'}} >
          {personalities.map( template => 
              <ListItem button className={classes.listItem} >
              <ListItemText primary={template.title} />
              {/* <ListItemIcon>
              {template.avatar()}
              </ListItemIcon> */}
            </ListItem>
            )}
    </div>
  )
}

function SideMenu() {
  const classes = useStyles()
  return (
    <div style={styles.parentContainer}>
    <div style={styles.child1}>
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
            <Typography variant="body2" textAlign={'center'} color="text.secondary">
              Templates
            </Typography>
              <List style={{overflow:'scroll', height:"80%" }} > 
              <RenderTemplatesMenu/>
              </List>
            </CardContent>
          </Card>
        </Drawer>
    </div>
    <div style={styles.child2}>
      <Outlet />
    </div>
    <div style={styles.child3}>
    <Drawer
          variant="permanent"
          anchor="rigth"
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
            <Typography variant="body2" textAlign={'center'} color="text.secondary">
              Estilo de respuesta
            </Typography>
            <List style={{overflow:'scroll', height:"80%" }} > 
              <RenderPersonalitiesMenu/>
              </List>
            </CardContent>
          </Card>
     </Drawer>
    </div>
  </div>
  );
}

export default SideMenu;
