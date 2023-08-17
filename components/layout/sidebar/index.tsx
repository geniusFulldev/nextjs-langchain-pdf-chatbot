'use client'

import Button from "@/components/ui/button";
import UploadForm from "./upload-form";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useLayoutProvider } from "@/lib/client/context/layout-provider";
import classnames from 'classnames';

const SideBar = () => {
    const { showChatSidebar, setShowChatSidebar } = useLayoutProvider();
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
        <div className={classnames("px-4 py-4 md:py-6 lg:py-8 w-[280px] h-full bg-slate-200 dark:bg-dark border-1 border-gray-500 dark:border-slate-500 shadow-sm shadow-slate-400 h-full flex flex-col justify-between fixed md:relative z-20 md:z-0 transition-all top-0 left-0 right-0",
            {"translate-x-[-280px] md:translate-x-0": !showChatSidebar})}
        >
            <div className="w-full">
                <div className="block md:hidden flex justify-end mb-6">
                    <button 
                        className="p-1.5 cursor-pointer rounded-full" 
                        onClick={() => setShowChatSidebar(false)}
                    >
                        <FontAwesomeIcon 
                            className="text-lg"
                            icon={faXmark} 
                        />
                    </button>
                </div>
                <Button 
                    className="w-full"
                    onClick={onStartNewChat}                
                >
                    Start New Chat
                </Button>            
            </div>
            <UploadForm />            
        </div>
    )
}

export default SideBar;