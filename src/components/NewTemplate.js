import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';

const NewTemplate = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [trainingMethod, setTrainingMethod] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Lógica para generar la respuesta utilizando la biblioteca openai o cualquier otra opción

    // Ejemplo de generación de respuesta utilizando una función dummy
    const generatedResponse = await generateResponse(prompt);
    setResponse(generatedResponse);
  };

  const generateResponse = async (prompt) => {
    // Lógica para generar la respuesta utilizando la biblioteca openai o cualquier otra opción
    // Puedes usar una API, una biblioteca de cliente o cualquier otro método

    // Ejemplo de función dummy que simplemente devuelve el prompt invertido
    const reversedPrompt = prompt.split('').reverse().join('');
    return reversedPrompt;
  };

  const handleTrainingMethodChange = (event, newTrainingMethod) => {
    setTrainingMethod(newTrainingMethod);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  const handleSave = () => {
    // Lógica para guardar los datos, incluyendo el archivo
    console.log('Saving data:', {
      prompt,
      response,
      trainingMethod,
      file
    });
  };

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <h1 style={{ textAlign: 'center' }}>New Template</h1>
            <div style={{ textAlign: 'center' }}>
              <label htmlFor="NameTemplet">Name of the new template:</label>
              <TextField id="outlined-basic" label="write the name" variant="outlined" />
              <h3 style={{ textAlign: 'center' }}>Please Select Your training method</h3>
              <ToggleButtonGroup
                orientation="vertical"
                value={trainingMethod}
                exclusive
                onChange={handleTrainingMethodChange}
                sx={{ mt: 2 }}
              >
                <ToggleButton value="method1" sx={{ width: '100%' }}>
                TRAIN WITH TEXT  <input type="file" onChange={handleFileUpload} />
                </ToggleButton>
                <ToggleButton value="method2" sx={{ width: '100%' }}>
                TRAIN WITH FILE  <input type="file" onChange={handleFileUpload} />
                </ToggleButton>
                <ToggleButton value="method3" sx={{ width: '100%' }}>
                TRAIN WITH WEBSITE <input type="file" onChange={handleFileUpload} />
                </ToggleButton>
              </ToggleButtonGroup>
              <h3 style={{ textAlign: 'center' }}>Now click on save to finish</h3>
       
              <Button variant="contained" disableElevation 
            style={{ textAlign: 'center' }}>
      Save
    </Button>
            </div>
           
          </Box>
        </Container>
      </React.Fragment>
    </div>
  );
};

export default NewTemplate;
