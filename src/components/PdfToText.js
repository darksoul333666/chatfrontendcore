import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import InputFiles from './InputFiles';
// Opcional: Carga las bibliotecas PDF.js desde la carpeta 'public' de tu proyecto
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToText = ({onTextIsLoaded}) => {
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');
  const [fileUrl, setFileUrl] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    console.log("hola", text);
  },{text})

  const handleTextExtraction = async (pdfUrl) => {
    try {
      const loadingTask = pdfjs.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      let extractedText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        extractedText += pageText;
      }
      console.log(extractedText);
      setText(extractedText);
      onTextIsLoaded(extractedText)
    } catch (error) {
      console.error('Error al extraer texto del PDF:', error);
    }
  };

  return (
    <div>
    <InputFiles  handle={(e) => {
        // const file = e.target.files[0];
        const fileU = URL.createObjectURL(e);
        setFileUrl(fileU)
        handleTextExtraction(fileU);
    }}  />
      <div>
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(error) => console.error('Error al cargar PDF:', error)}
        >
          {/* {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))} */}
        </Document>
      </div>
    </div>
  );
};

export default PdfToText;
