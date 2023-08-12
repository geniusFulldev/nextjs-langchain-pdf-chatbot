'use client'

import Button from "@/components/ui/button";
import UploadForm from "./upload-form";

const SideBar = () => {

    const onStartNewChat = async(e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const response = await fetch('/api/chat', {
                method: 'DELETE'
            });
            const data = await response.json();
            if( data.success ) {
                alert('Started new chat');
            }
            else {
                alert(data.message);
            }
        }
        catch(error: any) {
            alert(error.toString());
        }
    }

    return (
        <div className="px-4 py-4 md:py-6 lg:py-8 w-[240px] lg:w-[280px] h-full bg-slate-200 dark:bg-dark border-1 border-gray-500 dark:border-slate-500 shadow-sm shadow-slate-400 h-full flex flex-col justify-between">
            <Button 
                onClick={onStartNewChat}                
            >
                Start New Chat
            </Button>            
            <UploadForm />            
        </div>
    )
}

export default SideBar;