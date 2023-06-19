import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DescriptionIcon from '@material-ui/icons/Description';
import AddIcon from '@material-ui/icons/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Personalities, Templates } from '../config/Templates';
import * as Actions from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Fab } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API, ROUTES } from '../api';
import { useParams } from "react-router-dom";

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

const SideMenu = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const templateProfesion = useSelector(store => store.Chat.templateProfesion);
  const templateStyle = useSelector(store => store.Chat.templateStyle);
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  let { idTemplate } = useParams();

  useEffect(() =>{
    getTemplates();
  },[])

  useEffect(() =>{
    if(idTemplate !== null){
      let template = templates.find(template => template._id === idTemplate);
      if(template){
        dispatch(Actions.ChangeTemplateConfiguration({
          templateProfesion:template.name,
          templateStyle:templateStyle
        }))
      }
     
    }
  },[idTemplate, templates])

  const getTemplates = async() => {
    const response = await (await API()).get(ROUTES.GET_TEMPLATES);

    setTemplates(response.data.data);
    console.log(response.data.data);
  }

  const RenderTemplatesMenu = () => {
    // const templates = Object.values(Templates);
    return (
      <div style={{overflow:'scroll'}} >
            {templates.map( template => { 
                const isSelected = templateProfesion === template.name;
                const bgColor = {
                  backgroundColor: isSelected ? '#1976d2' : 'white',
                  color: isSelected ? 'white' : 'black'
                }
                return(<ListItem button className={classes.listItem} style={bgColor}  onClick={() => 
                  {
                    navigate(`/chat/${template._id}/0`);
                    dispatch(Actions.ChangeTemplateConfiguration({
                      templateProfesion:template.name,
                      templateStyle:templateStyle
                    }))
                  } }>
                <ListItemText primary={template.name} />
                <ListItemIcon>
                {/* <BotIcon/> */}
                </ListItemIcon>
              </ListItem>)}
              )}
      </div>
    )
  }
  
  const RenderPersonalitiesMenu = () => {
    const personalities = Object.values(Personalities)
    return (
      <div style={{overflow:'scroll'}} >
            {personalities.map( template => {
              const isSelected = templateStyle === template.title;
              const bgColor = {
                backgroundColor: isSelected ? '#1976d2' : 'white',
                color: isSelected ? 'white' : 'black'
              }
                return(<ListItem button className={classes.listItem} style={bgColor} onClick={() =>   
                  dispatch(Actions.ChangeTemplateConfiguration({
                  templateProfesion:templateProfesion,
                  templateStyle:template.title
                }))} >
                <ListItemText primary={template.title} />
              </ListItem>
              )})}
      </div>
    )
  }
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
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop:"25%",
              height: '70%',
            }}
          >
            <CardContent>
            <Typography variant="body2" textAlign={'center'} color="text.secondary">
              Templates
            </Typography>
              <List style={{overflow:'scroll', height:"100%" }} > 
              <RenderTemplatesMenu/>
              {/* <Fab
                aria-label="save"
                color="primary"
                onClickCapture={()=> navigate('/newTemplate')}
                sx={{  marginLeft:10 }}
               >
             <AddCircleIcon/>
            </Fab> */}
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

          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '70%',
              marginTop:'25%'
            }}
          >
            <CardContent>
            <Typography variant="body2" textAlign={'center'} color="text.secondary">
              Estilo de respuesta
            </Typography>
            <List style={{overflow:'scroll', height:"100%" }} > 
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
