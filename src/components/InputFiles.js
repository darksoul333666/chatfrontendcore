import React from 'react'
import { MuiFileInput } from 'mui-file-input'

const InputFiles = ({handle}) => {
  const [value, setValue] = React.useState(null)

 
  const handleChange = (newValue) => {
    // Filtrar los archivos seleccionados para aceptar solo archivos PDF
    const filteredFiles = [newValue].filter(file => file.type === 'application/pdf');
    if(filteredFiles.length > 0){
      setValue(filteredFiles)
      handle(newValue);
  
    } else {
    alert("Sólo se permiten pdf")  
    }
 
  };
  return <MuiFileInput value={value} onChange={handleChange} />
}

export default InputFiles;