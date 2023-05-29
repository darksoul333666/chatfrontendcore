import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import EngineerAvatar from '../assets/engineer.svg';
import InvestorAvatar from '../assets/investor.svg';
import LawyerAvatar from '../assets/lawyer.svg';
import PhysicistAvatar from '../assets/physicist.svg';
import TherapistAvatar from '../assets/therapist.svg';
import MyAvatar from '../assets/myAvatar.svg';
import MyAvatar1 from '../assets/myAvatar (1).svg';
import MyAvatar2 from '../assets/myAvatar (2).svg';
import MyAvatar3 from '../assets/myAvatar (3).svg';
import MyAvatar4 from '../assets/myAvatar (4).svg';
import MyAvatar5 from '../assets/myAvatar (5).svg';
import MyAvatar6 from '../assets/myAvatar (6).svg';
const NewTemplate = () => {
  const [templateName, setTemplateName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [trainingMethod, setTrainingMethod] = useState('');
  const [responseStyle, setResponseStyle] = useState('');
  const [file, setFile] = useState(null);

  const handleTemplateNameChange = (event) => {
    setTemplateName(event.target.value);
  };

  const handleAvatarSelection = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleTrainingMethodChange = (event, newTrainingMethod) => {
    setTrainingMethod(newTrainingMethod);
  };

  const handleResponseStyleChange = (event) => {
    setResponseStyle(event.target.value);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSave = () => {
    console.log('Saving data:', {
      templateName,
      selectedAvatar,
      trainingMethod,
      responseStyle,
      file
    });
  };

  const AvatarTable = () => {
    const avatars = Array.from(Array(20).keys());

    const avatarImages = [
      EngineerAvatar,
      InvestorAvatar,
      LawyerAvatar,
      PhysicistAvatar,
      TherapistAvatar,
      MyAvatar,
      MyAvatar1,
      MyAvatar2,
      MyAvatar3,
      MyAvatar4,
      MyAvatar5,
      MyAvatar6,
    ];

    return (
      <Grid container spacing={2} justifyContent="center">
        {avatars.map((avatar) => (
          <Grid item key={avatar} xs={3}>
            <Avatar
              src={avatarImages[avatar % avatarImages.length]}
              alt={`Avatar ${avatar + 1}`}
              onClick={() => handleAvatarSelection(avatar)}
              style={{
                cursor: 'pointer',
                border: selectedAvatar === avatar ? '2px solid #000' : 'none',
                textAlign: 'center',
                marginLeft: 100
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box
            sx={{
              bgcolor: '#f0f0f0',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '20px' }}>New Template</h2>
              <TextField
                sx={{ marginBottom: '20px' }}
                id="outlined-basic"
                label="Nombre de la plantilla"
                variant="outlined"
                value={templateName}
                onChange={handleTemplateNameChange}
              />
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Please select your Avatar</h3>

              <AvatarTable />
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Please select your training method</h3>
              <ToggleButtonGroup
                orientation="vertical"
                value={trainingMethod}
                exclusive
                onChange={handleTrainingMethodChange}
                sx={{ mt: 2 }}
              >
                <ToggleButton
                  value="method1"
                  sx={{ width: '100%', backgroundColor: 'None', color: 'black', '& input': { display: 'none' } }}
                >
                  TRAIN WITH TEXT
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Enter text"
                  />
                </ToggleButton>
                <ToggleButton
                  value="method2"
                  sx={{ width: '100%', backgroundColor: '#9fa8da', color: 'white' }}
                >
                  TRAIN WITH FILE <input type="file" onChange={handleFileUpload} />
                </ToggleButton>
              </ToggleButtonGroup>
              <h3 style={{ textAlign: 'center', marginTop: '20px' }}>Select response style</h3>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Style </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={responseStyle}
        label="Age"
        onChange={handleResponseStyleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="style1">Analitico</MenuItem>
        <MenuItem value="style2">Intorvertido</MenuItem>
        <MenuItem value="style3">Extorvertido</MenuItem>
        <MenuItem value="style1">Amigable</MenuItem>
        <MenuItem value="style2">Perfecionista</MenuItem>
        <MenuItem value="style3">Asertivo</MenuItem>
      </Select>
    </FormControl>
          
             
            </div>
            <Button
  variant="contained"
  disableElevation
  sx={{
    marginTop: '20px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: '200px',
    height: '50px',
    fontSize: '18px',
    fontWeight: 'bold',
    backgroundColor: '#2196f3',
    color: '#ffffff',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  }}
  onClick={handleSave}
>
  Save
</Button>

          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default NewTemplate;
