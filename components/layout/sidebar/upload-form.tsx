'use client'

import React, {useState, ChangeEvent, useEffect} from 'react';
import Button from '@/components/ui/button';
import { usePdfProvider } from '@/lib/client/context/pdf-context';

const UploadForm = () => {
    const [ files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const { uploadedPdfFiles: uploadedFiles, setUploadedPdfFiles: setUploadedFiles} = usePdfProvider();

    const getUploadedFiles = async() => {
        try {
            const response = await fetch('/api/file');
            const data = await response.json();
            if( data.success && data.files ) {
                setUploadedFiles(data.files);
            }
            else {
                setUploadedFiles([]);
            }
        }
        catch(error: any) {
            console.log('getUploadedFiles error =>', error);
            setUploadedFiles([]);
        }
    }

    useEffect(() => {
        getUploadedFiles();
    },[])

    const onChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        if( event.target.files && event.target.files.length > 0 ) {
            setFiles([...event.target.files])
        }
    }

    const onUploadFile = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if( files.length > 0 ) {
            const body = new FormData();
            // body.append("files", file);
            files.forEach(file => body.append("file", file));
            setLoading(true);
            try {
                const response = await fetch("/api/file", {
                    method: "POST",
                    body
                  });        
                const data = await response.json();
                console.log('onUploadFile data =>', data);
                if( data.success ) {
                    alert("Succeeded to upload a pdf file");
                }
                else {
                    alert(data.message);
                }
                
                setUploadSuccess(data.success);
                // setUploadedFiles([file.name]);
                 setUploadedFiles(files.map(file => file.name));
            }
            catch(error: any) {
                console.log('onUploadFile error =>', error);
                alert(error.toString());
            }
            finally {
                setLoading(false);
                setFiles([]);
            }
            
        }
    }

    const onDeleteUploadedFiles = async(e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            setLoading(true);
            const response = await fetch('/api/file', {
                method: "DELETE"
            });
            const data = await response.json();
            if( data.success ) {
                setUploadedFiles([]);
            }
        }
        catch(error: any) {
            console.log('getUploadedFiles error =>', error);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div>
        { uploadedFiles.length === 0? (
            <>
                <div className="mb-3">
                    <label
                        htmlFor="fileForm"
                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                        Select a pdf file
                    </label>
                    <input
                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="fileForm"
                        accept='.pdf'
                        size={2048}
                        onChange={onChangeFileInput}
                        multiple
                    />
                </div>        
                <div className="flex justify-center">
                    <Button
                        className='w-full'
                        loading={loading}
                        onClick={ onUploadFile }
                    >
                        Upload
                    </Button>
                </div>
            </>
        ):(
            <>
                <div className="mb-3">
                    <p className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                        Uploaded Files
                    </p>
                    <div className='border-gray-800 border-2 rounded-md p-2'>
                    { uploadedFiles.map((file, idx) => (
                        <p key={`uf-${idx}`} className='my-1 truncate'>{file}</p>
                    ))}
                    </div>
                </div>        
                <div className="flex justify-center">
                    <Button
                        className='w-full'
                        loading={loading}
                        onClick={ onDeleteUploadedFiles }
                    >
                        Delete Uploaded Files
                    </Button>
                </div>
            </>
        )}
        </div>
    )
}

export default UploadForm;