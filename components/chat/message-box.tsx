'use client'

import React from "react";
import classnames from 'classnames';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'; 
import { faRobot, faUser } from "@fortawesome/free-solid-svg-icons";
import { Message } from "@/types/chat";

interface MessageBoxProps {
    message: Message
}

const MessageBox: React.FC<MessageBoxProps> = ({
    message
}) => {

    return (
        <div 
            className={classnames("relative my-4 rounded-md border-slate-400 px-6 py-4 flex gap-3",
                {"bg-slate-200 dark:bg-slate-500": message.type === 'user'},
                {"bg-gray-200 dark:bg-gray-500": message.type === 'bot'}
            )}
        >
            <div className="w-6 h-6 ">
            { message.type === 'bot'? (
                <FontAwesomeIcon icon={faRobot} className="w-full h-full text-pink-300"/>
            ):(
                <FontAwesomeIcon icon={faUser} className="w-full h-full text-sky-300"/>
            )}
            </div>
            {message.text}
        </div>
    )
}

export default MessageBox;