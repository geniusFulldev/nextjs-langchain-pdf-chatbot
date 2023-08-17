'use client'

import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useLayoutProvider } from '@/lib/client/context/layout-provider';

const ShowSidebar = () => {
    const { setShowChatSidebar } = useLayoutProvider();

    return (
        <button 
        className="p-1.5 cursor-pointer rounded-full block md:hidden" 
        onClick={() => setShowChatSidebar(true)}
    >
        <FontAwesomeIcon 
            className="text-lg"
            icon={faBars} 
        />
    </button>

    );
}

export default ShowSidebar;