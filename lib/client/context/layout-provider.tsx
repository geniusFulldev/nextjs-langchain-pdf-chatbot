'use client'

import React, { useContext, useState, useMemo } from 'react';

interface ILayoutContextProps {
    showChatSidebar: boolean;
    setShowChatSidebar: (show: boolean) => void;
}

const LayoutContext = React.createContext<ILayoutContextProps>({
    showChatSidebar: false,
    setShowChatSidebar: (show: boolean) => {}
});


const LayoutProvider = ({children}: {children: React.ReactNode}) => {
    const [showChatSidebar, setShowChatSidebar] = useState<boolean>(false);

    const values = useMemo(() => ({
        showChatSidebar,
        setShowChatSidebar
    }),[showChatSidebar, setShowChatSidebar]);

    return (
        <LayoutContext.Provider value={values}>
        { children }
        </LayoutContext.Provider>
    );
}

export const useLayoutProvider = () => useContext(LayoutContext);
export default LayoutProvider;