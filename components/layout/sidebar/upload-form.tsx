'use client'

import React, {useState, ChangeEvent, FormEvent} from 'react';

const UploadForm = () => {
    const [ file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const onChangeFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        if( event.target.files && event.target.files.length > 0 ) {
            setFile(event.target.files[0])
        }
    }

    const onUploadFile = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if( file ) {
            const body = new FormData();
            body.append("file", file);
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
            }
            catch(error: any) {
                console.log('onUploadFile error =>', error);
                alert(error.toString());
            }
            finally {
                setLoading(false);
            }
            
        }
    }

    return (
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
                />
            </div>        
            <div className="flex justify-center">
              <button 
                className="flex w-full items-center justify-center rounded-md bg-primary py-3 px-5 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                disabled={loading}
                onClick={ onUploadFile }
              >
                Process
              </button>                
            </div>
        </>
    )
}

export default UploadForm;