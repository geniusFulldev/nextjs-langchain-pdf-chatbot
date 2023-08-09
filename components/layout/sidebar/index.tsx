'use client'

import UploadForm from "./upload-form";

const SideBar = () => {

    return (
        <div className="p-4 w-[240px] lg:w-[280px] h-full bg-slate-200 dark:bg-dark border-1 border-gray-500 dark:border-slate-500 shadow-sm shadow-slate-400 h-full flex flex-col justify-center">
            <UploadForm />            
        </div>
    )
}

export default SideBar;