import Tesseract from 'tesseract.js';

const ConvertImageToText = () => {
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
      
        // Cargar la imagen utilizando el objeto File y convertirla a un objeto Tesseract.js
        const { data } = await Tesseract.recognize(file);
      
        // Obtener el texto extraído de la imagen
        const extractedText = data.text;
      
        // Hacer lo que necesites con el texto extraído
        console.log(extractedText);
      };
      
    return(
        <input type="file" onChange={handleFileChange} />

    )
}

export default ConvertImageToText;