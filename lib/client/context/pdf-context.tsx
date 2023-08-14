'use client'

import React, { useContext, useState } from 'react';

interface IPdfContextProps {
    uploadedPdfFiles: string[];
    setUploadedPdfFiles: (files: string[]) => void
}

const PdfContext = React.createContext<IPdfContextProps>({
    uploadedPdfFiles: [],
    setUploadedPdfFiles: (files: string[]) => {}
});


const PdfProvider = ({children}: {children: React.ReactNode}) => {
    const [uploadedPdfFiles, setUploadedPdfFiles] = useState<string[]>([]);

    const values = {
        uploadedPdfFiles,
        setUploadedPdfFiles
    };

    return (
        <PdfContext.Provider value={values}>
        { children }
        </PdfContext.Provider>
    );
}


export const usePdfProvider = () => useContext(PdfContext);
export default PdfProvider;